export default {
    actAjax(opt){
        let opts = Object.assign({},opt,{"type":"ajax"});
        return opts;
    }
}