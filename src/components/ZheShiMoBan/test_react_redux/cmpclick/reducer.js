export default (state = 0, action) => {
    var data = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case '+':
            return data + 1;
        default:
            return data;
    }
}