import React, { Component } from 'react';

import {Provider} from 'react-redux';
import store from './redux/store.js';

import CmpClick from './cmpclick/cmpclick.js';
import CmpShow from './cmpshow/cmpshow.js';
import CmpAsync from './cmpasync/cmpasync.js';


class TestReactRedux extends Component{
    toIndex = () => {
        this.props.history.push({'pathname':'/'})
    }
    render(){
        return (
            <Provider store={store}>
                <div className="container">
                    <h4>Reudx &amp; React-Redux</h4>
                    <p onClick={this.toIndex} style={{"color":"#fb0"}}>跳转到首页</p>
                    <CmpClick/>
                    <CmpShow/>
                    <CmpAsync/>
                </div>
            </Provider>
        );
    }
};

export default TestReactRedux;