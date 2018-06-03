var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;

var objCRUD = {
    "DB":{},
    "objDB":{
        // dbName
        // url
    },
    "connect":function(dbName,url){
        var that = this;
        url = url || "mongodb://localhost:27017/";
        return new Promise(function(resolve,reject){
            mongoClient.connect(url,{ useNewUrlParser: true }, function (err,database) {
                if(err){
                    throw err;
                    reject();
                }else{
                    that.objDB = database.db(dbName || "test");
                    that.DB = database;
                    resolve();
                }
            });
        });
    },
    "insert":function(colName,data){
        var that = this;
        return new Promise(function (resolve,reject){
            that.objDB.collection(colName).insert(data,function (err,res){
                if(err){
                    throw err;
                    reject();
                }else{
                    resolve(res);
                };
                
            });
        });
    },
    "select":function(colName,terms){
        var that = this;
        return new Promise(function (resolve,reject){
            that.objDB.collection(colName).find(terms || {}).toArray(function (err, res){
                if(err){
                    throw err;
                    reject();
                }else{
                    resolve(res);
                };
            });
        });
    },
    "updateOne":function(colName,termsSelect,termsUpdate){
        var that = this;
        return new Promise(function (resolve,reject){
            that.objDB.collection(colName).updateOne(termsSelect, termsUpdate, function (err, res) {
                if(err){
                    throw err;
                    reject();
                }else{
                    resolve(res);
                };
            });
        });
    },
    "updateMany":function(colName,termsSelect,termsUpdate){
        var that = this;
        return new Promise(function (resolve,reject){
            that.objDB.collection(colName).updateMany(termsSelect, termsUpdate, function (err, res) {
                if(err){
                    throw err;
                    reject();
                }else{
                    resolve(res);
                };
            });
        });
    },
    "deleteOne":function(colName,terms){
        var that = this;
        return new Promise(function (resolve,reject){
            that.objDB.collection(colName).deleteOne(terms,function (err, res) {
                if(err){
                    throw err;
                    reject();
                }else{
                    resolve(res);
                };
            });
        });
    },
    "deleteMany":function(colName,terms){
        var that = this;
        return new Promise(function (resolve,reject){
            that.objDB.collection(colName).deleteMany(terms,function (err, res) {
                if(err){
                    throw err;
                    reject();
                }else{
                    resolve(res);
                };
            });
        });
    },
    "close":function(){
        if(!this.DB){
            this.connect("test");
        }
        this.DB.close();
    }
}
   
module.exports = objCRUD;
