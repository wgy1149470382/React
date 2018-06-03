const path = require("path");
const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const utilRes = require("../util/utilRes.js");
const utilMongo = require("../util/utilMongo.js");
const routerSign = require("./routerSign.js");
const routerMine = require("./routerMine.js");
const routerProduct = require("./routerProduct.js");
const routerAdmin = require("./routerAdmin.js");

const app = express();
app.use(express.static(path.join(__dirname,"../../build/")));

app.all("*",function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Accept,X-Requested-With,auth");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By","3.2.1")
    if(req.method=="OPTIONS") {
      res.sendStatus(200);
    }else{
      next();
    }
});

const DBLink = utilMongo.connect("tradecat","mongodb://localhost:27017/");
DBLink
.then(function (result){
    app.use(bodyParser.urlencoded({extended:false}));
    routerSign.register(app,{"jwt":jwt,"utilMongo":utilMongo,"utilRes":utilRes});

    const filterJwt = function(req,res,next){
        var token = req.headers["auth"];
        if(!token || !req.body.token){
            res.send(utilRes(false,null,"unauth"));
        }else{
            var oldtoken = jwt.decode(req.body.token,"secret");
            var d = (new Date().getTime())/1000;
            if(d <= oldtoken.exp){
                next();
            }else{
                res.send(utilRes(false,null,"unauth"));
            };
        };
    };
    routerProduct.register(app,{"utilMongo":utilMongo,"utilRes":utilRes,"jwt":jwt,"filterJwt":filterJwt});
    routerMine.register(app,{"utilMongo":utilMongo,"utilRes":utilRes,"jwt":jwt,"filterJwt":filterJwt});
    routerAdmin.register(app,{"utilMongo":utilMongo,"utilRes":utilRes,"jwt":jwt,"filterJwt":filterJwt});
})
.catch(function (error){
    // console.log(error);
});

const server = app;
module.exports = {
    "listen":function(port){
        server.listen(port || 6655);
    }
};