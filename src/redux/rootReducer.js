import {combineReducers} from "redux";

const rootReducer = combineReducers({
    testReducer:(state = {}, action)=>{
        // 这是一个完全没用的reducer：因为我们没用redux，放这里是为了不报错。
        let states = JSON.parse(JSON.stringify(state));
        switch(action.type){
            case "ajaxing":
                states.restype = "ajaxing";
                break;
            case "ajaxed":
                states.restype = "ajaxed";
                if(action.name){
                    states[action.name] = states[action.name] || {};
                    states[action.name].data = action.data;
                } else {
                    states.data = action.data;
                }
                break;
            case "ajaxerr":
                states.restype = "ajaxerr";
                break;
            default:
                states.restype = "bug";
                break; 
        }
        return states;
    }
});

export default rootReducer;