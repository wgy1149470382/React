module.exports = {"register":function(app,opt){
    app.post("/sign/signup",function (req,res){
        var terms = {
            uname:req.body.uname
        };
        opt.utilMongo.select("users",terms)
        .then(function (data){
            if(data.length > 0){
                res.send(opt.utilRes(false,null,"repeat"));
            }else{
                var terms = Object.assign({},{
                    "tradeCount":0,
                    "tradeList":[],
                    "uphone":"",
                    "uQQ":""
                },req.body);
                opt.utilMongo.insert("users",terms)
                .then(function (){
                    var token = opt.jwt.sign({
                        "uname": req.body.uname
                    },"secret",{ 
                        expiresIn: 60*60 
                    });
                    res.send(opt.utilRes(true,token,"signup"));
                });
            }
        });
    });

    app.post("/sign/signin",function (req,res){
        opt.utilMongo.select("users",{"uname":req.body.uname})
        .then(function (data){
            if(data.length > 0){
                if(req.body.upsw == data[0].upsw){
                    if(req.body.token){
                        var oldtoken = opt.jwt.decode(req.body.token,"secret");
                        var d = (new Date().getTime())/1000;
                        if(d >= oldtoken.exp){
                            var token = opt.jwt.sign({
                                "uname": req.body.uname
                            },"secret",{ 
                                expiresIn: 60*60 
                            });
                            res.send(opt.utilRes(true,token,"signin"));
                        }else{
                            if(oldtoken.uname == req.body.uname){
                                res.send(opt.utilRes(false,null,"repeat"));
                            }else{
                                var token = opt.jwt.sign({
                                    "uname": req.body.uname
                                },"secret",{ 
                                    expiresIn: 60*60 
                                });
                                res.send(opt.utilRes(true,token,"differ"));
                            };
                        };
                    }else{
                        var token = opt.jwt.sign({
                            "uname":req.body.uname
                        },"secret",{ 
                            expiresIn: 60*60 
                        });
                        res.send(opt.utilRes(true,token,"signin"));
                    }
                }else{
                    res.send(opt.utilRes(false,null,"errpsw"));
                }
            }else{
                res.send(opt.utilRes(false,null,"non"));
            }
        });
    });

}};