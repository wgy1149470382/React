import "./index.css";
import "./lib/flexible.js";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./redux/store.js";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import CmpSort from "./components/sort/sort.js";
import CmpMy from "./components/my/my.js";
import CmpLogin from "./components/login/login.js";
import CmpList from "./components/list/list.js";
import Details from './components/details/details.js';
import Affirm from './components/affirm/affirm.js';
import Pay from './components/pay/pay.js';
import CmpAdmin from "./components/admin/admin.js";
import Register from "./components/reg/reg.js";

class Index extends Component{
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <div style={{'height':'100%'}}>
                        <Switch>
                            <Route exact path="/" component={App}/>
                            <Route path="/sort" component={CmpSort}/>
                            <Route path="/my" component={CmpMy}/>
                            <Route path="/login" component={CmpLogin}/>
                            <Route path="/list" component={CmpList}/>
                            <Route path="/details" component={Details}/>
                            <Route path="/affirm" component={Affirm}/>
                            <Route path="/pay" component={Pay} />
                            <Route path="/admin" component={CmpAdmin}/>
                            <Route path="/register" component={Register}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
