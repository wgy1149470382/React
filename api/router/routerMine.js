var ObjectId = require("mongodb").ObjectId;

module.exports = {"register":function(app,opt){
    app.post("/mine/tradeCount",opt.filterJwt,function (req,res){
        var nowtoken = opt.jwt.decode(req.body.token,"secret");
        opt.utilMongo.select("products",{"_id":ObjectId(req.body._id)})
        .then(function (data){
            var newdata = {
                "_id":data[0]._id,
                "infos":data[0].infos
            };
            newdata.infos.tempNum = req.body.tempNum;
            opt.utilMongo.select("users",{"uname":nowtoken.uname})
            .then(function (data2){
                opt.utilMongo.updateOne("users",{"uname":nowtoken.uname},{$push:{"tradeList":newdata}})
                .then(function (){
                    opt.utilMongo.updateOne("users",{"uname":nowtoken.uname},{$set:{"tradeCount":data2[0].tradeCount+1}})
                    .then(function (){
                        res.send(opt.utilRes(true,null,"updated"));
                    });
                });
            });
        });
    });

    app.post("/mine/writeUserdata",opt.filterJwt,function (req,res){
        var nowtoken = opt.jwt.decode(req.body.token,"secret");
        opt.utilMongo.select("users",{"uname":nowtoken.uname})
        .then(function (data){
            var newdata = req.body;
            delete newdata.token;
            opt.utilMongo.updateOne("users",{"uname":nowtoken.uname},{$set:newdata})
            .then(function (){
                res.send(opt.utilRes(true,null,"updated"));
            });
        });
    });

    app.post("/mine/userCenter",opt.filterJwt,function (req,res){
        var nowtoken = opt.jwt.decode(req.body.token,"secret");
        opt.utilMongo.select("users",{"uname":nowtoken.uname})
        .then(function (data){
            res.send(opt.utilRes(true,data,"userdata"));
        });
    });

    app.post("/mine/userToken",opt.filterJwt,function (req,res){
        var nowtoken = opt.jwt.decode(req.body.token,"secret");
        opt.utilMongo.select("users",{"uname":nowtoken.uname})
        .then(function (data){
            res.send(opt.utilRes(true,{},"auth"));
        });
    });

}};