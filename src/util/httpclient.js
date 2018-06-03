
import superagent from "superagent";

function filterUrl(url){
    var baseUrl = 'http://localhost:6655';
    if(url && url.startsWith('http')){
        return url;
    };
    return baseUrl + url;
};

// opt:{
//     method:GET || POST,
//     url:,
//     set:{"auth":token,"Content-Type":"application/x-www-form-urlencoded"}
//     send:{"key":"form-data"}
// }
export default {
    'ajax':function(opt){
        opt.url = opt.url ? filterUrl(opt.url) : null;
        return new Promise((resolve,reject)=>{
            superagent(opt.method || "GET",opt.url)
            .set(opt.set || {"Content-Type":"application/json"})
            .send(opt.send || {})
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            })
        });
    }
};