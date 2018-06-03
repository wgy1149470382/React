
import Requests from "../../../util/httpclient.js";

export default function middleware(){ 
    return function(dispatch){
        return function(action){
            let opt = Object.assign({},action);
            if(opt.type === "ajax"){
                dispatch({
                    type:"ajaxing"
                });
                Requests.ajax(opt)
                .then((res)=>{
                    dispatch({
                        type:"ajaxed",
                        data:res.data
                    });
                }).catch((err)=>{
                    dispatch({
                        type:"ajaxerr"
                    });
                });
            }else{
                dispatch(action);
            }
        }
    }  
}