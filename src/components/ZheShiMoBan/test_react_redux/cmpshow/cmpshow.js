import React, { Component } from 'react';
import {connect} from 'react-redux';

import store from '../redux/store.js';
import action from '../cmpclick/action.js';

class CmpShow extends Component{
    state = {
        "num":6,
        "txt":"加上监听才实现了各组件通信。"
    }
    render(){
        return (
            <div>
                <p>{this.state.txt}</p>
                <p>{this.state.num + store.getState().ReducerClick}</p>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        ReducerClick: state.ReducerClick
    }
};

export default connect(mapStateToProps,action)(CmpShow);