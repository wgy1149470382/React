export default (state = {}, action) => {
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
    }
    return states;
}