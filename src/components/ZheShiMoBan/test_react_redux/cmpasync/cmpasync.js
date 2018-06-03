import React, { Component } from 'react';
import {connect} from 'react-redux';
import Requests from '../../../util/httpclient.js';

import action from './action.js';

class CmpAsync extends Component{
    state = {
        "ajaxdata":"noajax"
    }
    reqs = () => {
        // Requests.ajax({
        //     "method":"POST",
        //     "set":{"auth":"token"},
        //     "send":{"data":"val"}
        // });
        let opt = {
            "method":"GET",
            "url":"https://cnodejs.org/api/v1/topics"
        };
        this.props.actAjax(opt);
    }
    componentWillUpdate(){
        
    }
    render(){
        function resajax(cmp){
            if(cmp.props.redCmpAsync.restype === "ajaxing"){
                cmp.state.ajaxdata = "ajaxing";
                console.log("ajaxing");
                document.body.style.backgroundColor = "#ccc";
            }else if(cmp.props.redCmpAsync.restype === "ajaxed"){
                cmp.state.ajaxdata = "ajaxed";
                console.log("ajaxed");
                document.body.style.backgroundColor = "#fff";
            }else if(cmp.props.redCmpAsync.restype === "ajaxerr"){
                cmp.state.ajaxdata = "ajaxerr";
                document.body.style.backgroundColor = "#f00";
                console.log("ajaxerr");
            }else{
                console.log("noajax");
            }
        };
        resajax(this);

        return (
            <div>
                <input type="button" value="请求数据" onClick={this.reqs}/>
                <p>{this.state.ajaxdata}</p>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        redCmpAsync:state.redCmpAsync
    }
};

export default connect(mapStateToProps,action)(CmpAsync);