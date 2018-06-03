import '../../css/cmp_login.css';

import React, { Component } from 'react';

import FootNav from '../main/footnav.js';
import Requests from '../../util/httpclient.js';


class CmpLogin extends Component{
    toRegister = () => {
        this.props.history.push({'pathname':'/register'})
    }
     tohome = () => {
        this.props.history.push({'pathname':'/'})
    }
    state = {
        username:'',
        password:''
    }
    loginjym(e){
        this.setState({
            username:e.target.value
        })
        this.refs.tisi.style.display='none';

    }
    jympwd(e){
        this.setState({
            password:e.target.value
        })
        this.refs.tisi.style.display='none';

    }
    login(){
        // let that = this;
        let token = localStorage.getItem("jymUserToken") || null;

        Requests.ajax({
            "method":"POST",
            "url":"/sign/signin",
            "set":{"Content-Type":"application/x-www-form-urlencoded","auth":token},
            "send":{
                "uname":this.state.username,
                "upsw":this.state.password,
                "token":token
            }
        }).then((res)=>{
            if(res.body.msg === "signin"){
                localStorage.setItem("jymUserToken",res.body.data);
                // console.log("signin");
                //登录成功跳转
            this.props.history.push({'pathname':'/my'})                
            }else if(res.body.msg === "repeat"){
                // console.log("repeat");
                this.refs.tisi.style.display='block';
                this.refs.text.innerHTML = '您帐号已经登录，不需要再次登录'
            }else if(res.body.msg === "differ"){
                localStorage.setItem("jymUserToken",res.body.data);
                // console.log("differ");
                //再次登录成功跳转
            this.props.history.push({'pathname':'/my'})
            }else if(res.body.msg === "non"){
                // console.log("non");
                this.refs.tisi.style.display='block';
                this.refs.text.innerHTML = '您输入的帐号不存在..'
                // 提示:帐号不存在;
            }else if(res.body.msg === "errpsw"){
                // console.log("errpsw");
                this.refs.tisi.style.display='block';
                this.refs.text.innerHTML = '您输入的密码不正确，需要再次输入..'
                // 提示:密码错误;
            }else{
                // console.log("bug");
                this.refs.tisi.style.display='block';
                this.refs.text.innerHTML = '请重新登录..'
                // 提示:请重新登录;
            }
        });

    }
    render(){
        return (
            <div className="jym_service flexbox animate-route">
                <div className="container">
                    <div className="header">
                        <div className="close-dl" onClick={this.tohome}></div>                        
                    </div>
                    <div className="session">
                        <h2>
                            <span className="uclogin">UC登录</span>
                            <span className="register" onClick={this.toRegister}>注册</span>
                        </h2>
                        <div className="tab-content">
                            <input type="text" placeholder="帐号/用户名/手机" className="loginName" value={this.state.username} onChange={this.loginjym.bind(this)}/>
                            <input type="password" placeholder="请输入密码" className="pwd" value={this.state.password} onChange={this.jympwd.bind(this)}/>
                        </div>
                        <div className="lable" onClick={this.login.bind(this)}>登  录</div>
                        <p className="forget_pwd">忘记密码？</p>
                        <ul className="other-link">
                            <li className="qq-link">
                                <i></i>
                                <span>QQ</span>
                            </li>
                            <li className="tb-link">
                                <i></i>
                                <span>taobao</span>
                            </li>
                        </ul>
                    </div>
                    <div className="hint" ref="tisi" style={{display:'none'}}>
                    <p className="_hint" ref="text"></p>
                        <span></span>
                        <i></i>
                    </div>
                </div>
                <FootNav/>
            </div>
        );
    }
};

export default CmpLogin;