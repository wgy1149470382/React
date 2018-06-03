var ObjectId = require("mongodb").ObjectId;

module.exports = {"register":function(app,opt){
    app.get("/admin/getcol",function (req, res){
        var terms = {};
        opt.utilMongo.select(req.query.col,terms)
        .then(function (data){
            if(data.length > 0){
                res.send(opt.utilRes(true,data,"founded"));
            }else{
                res.send(opt.utilRes(false,"","notfound"));
            }
        });
    });

    app.get("/admin/getdoc",function (req, res){
        var terms = {
            "_id":ObjectId(req.query._id)
        };
        opt.utilMongo.select(req.query.type,terms)
        .then(function (data){
            if(data.length > 0){
                res.send(opt.utilRes(true,data,"founded"));
            }else{
                res.send(opt.utilRes(false,{},"notfound"));
            }
        });
    });

    app.post("/admin/updatedoc",function (req,res){
        // JSON.parse(req.query._id)转字符转再转对象以免格式转变。
        opt.utilMongo.updateOne(req.query.type,{"_id":ObjectId(JSON.parse(req.query._id))},{$set:JSON.parse(req.body.datas)}).then(function (){
            opt.utilMongo.select(req.query.type,{}).then(function (data){
                res.send(opt.utilRes(true,data,"updated"));
            });
        });
    });

    app.post("/admin/insertdoc",function (req,res){
        opt.utilMongo.insert(req.query.type,JSON.parse(req.body.datas)).then(function (){
            opt.utilMongo.select(req.query.type,{}).then(function (data){
                res.send(opt.utilRes(true,data,"inserted"));
            });
        });
    });

    app.get("/admin/deletedoc",function (req,res){
        opt.utilMongo.deleteOne(req.query.type,{"_id":ObjectId(req.query._id)}).then(function (){
            opt.utilMongo.select(req.query.type,{}).then(function (data){
                res.send(opt.utilRes(true,data,"deleted"));
            });
        });
    });

    app.post("/list",function (req, res){
        var terms = {
            "gameName":req.body.gameName
        };
        opt.utilMongo.select("products",terms)
        .then(function (data){
            if(data.length > 0){
                if(data.length >= req.body.num){
                    var newdata = data.slice(0,req.body.num);
                    res.send(opt.utilRes(true,newdata,"founded"));
                }else{
                    res.send(opt.utilRes(true,data,"allfounded"));
                }
            }else{
                res.send(opt.utilRes(false,{},"notfound"));
            }
        });
    });
}};