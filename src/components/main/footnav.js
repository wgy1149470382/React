import '../../css/main_footnav.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class FootNav extends Component{
    render(){
        return (
            <ul className="jym_footnav">
                <li><Link to="/">首页</Link></li>
                <li><Link to="/sort">分类</Link></li>
                <li><Link to="/my">个人中心</Link></li>
                <li><Link to="/login">注册/登录</Link></li>
            </ul>
        );
    }
};

export default FootNav;