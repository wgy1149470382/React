var ObjectId = require("mongodb").ObjectId;

module.exports = {"register":function(app,opt){
    app.get("/product",function (req, res){
        var terms = {
            "_id":ObjectId(req.query._id)
        };
        opt.utilMongo.select("products",terms)
        .then(function (data){
            if(data.length > 0){
                res.send(opt.utilRes(true,data,"founded"));
            }else{
                res.send(opt.utilRes(false,{},"notfound"));
            }
        });
    });

    app.post("/sort/letter",function (req, res){
        var terms = {
            "letter":req.body.letter
        };
        opt.utilMongo.select("games",terms)
        .then(function (data){
            if(data.length > 0){
                res.send(opt.utilRes(true,data,"founded"));
            }else{
                res.send(opt.utilRes(false,{},"notfound"));
            }
        });
    });

    app.post("/sort/keyword",function (req, res){
        var terms = {};
        opt.utilMongo.select("games",terms)
        .then(function (data){
            if(data.length > 0){
                var arr = [];
                var reg = new RegExp(req.body.keyword,"i");
                data.map(function (k,i){
                    if(k.keyword.match(reg)){
                        arr.push(k);
                    }
                });
                res.send(opt.utilRes(true,arr,"founded"));
            }else{
                res.send(opt.utilRes(false,{},"notfound"));
            }
        });
    });

    app.get("/sort/hot",function (req, res){
        var terms = {};
        opt.utilMongo.select("games",terms)
        .then(function (data){
            if(data.length > 0){
                var arr = [];
                data.map(function (k,i){
                    if(k.hot){
                        arr.push(k);
                    }
                });
                res.send(opt.utilRes(true,arr,"founded"));
            }else{
                res.send(opt.utilRes(false,{},"notfound"));
            }
        });
    });

    // app.post("/sort/gameName",function (req, res){
    //     var terms = {
    //         "gameName":req.body.gameName
    //     };
    //     opt.utilMongo.select("games",terms)
    //     .then(function (data){
    //         if(data.length > 0){
    //             res.send(opt.utilRes(true,data,"founded"));
    //         }else{
    //             res.send(opt.utilRes(false,{},"notfound"));
    //         }
    //     });
    // });

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