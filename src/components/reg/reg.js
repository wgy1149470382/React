import '../../css/reg.css';

import React, { Component } from 'react';

import FootNav from '../main/footnav.js';
import Requests from '../../util/httpclient.js';


class Register extends Component{
    state = {
        username:'',
        password:''
    }
    tologin = () => {
        this.props.history.push({'pathname':'/login'})
    }
    tohome = () => {
        this.props.history.goBack();
    }

    userInput(e){
        this.setState({
            username:e.target.value
        })
    this.refs.hints.style.display='none';
    }
    pwdInput(e){
        // console.log(e.target.value)        
        this.setState({
            password:e.target.value
        })
        // console.log(this.state.password)
        if(this.refs.tisi.style.display!=='block'&&this.state.username!==''&&e.target.value!==''){
                this.refs.zcbtn.style.background='red'  
        }else{
                this.refs.zcbtn.style.background='#D8DADC'    
        }
      

    }
    loginJudge(e){
        var reg = /^(?![^a-zA-Z]+$)(?![\D_]+$).{6,15}$/;
        let username = e.target.value;
        if(reg.test(username)){
            this.refs.tisi.style.display='none';
        }else{
            this.refs.tisi.style.display='block';

        }
    }
    register(){
        if(this.refs.zcbtn.style.background==='red'){
                Requests.ajax({
                "method":"POST",
                "url":"/sign/signup",
                "set":{"Content-Type":"application/x-www-form-urlencoded"},
                "send":{
                    "uname":this.state.username,
                    "upsw":this.state.password
                }
            }).then((res)=>{
                if(res.body.status){
                    localStorage.setItem('jymUserToken',res.body.data);
                    this.props.history.push({'pathname':'/my'})                    
                }else{
                    this.refs.hints.style.display='block';
                }
            });
        }
    }
    render(){
        return (
            <div className="jym_register flexbox ">
                <div className="container">
                    <div className="header">
                        <div className="close-dl" onClick={this.tohome}></div>                        
                    </div>
                    <div className="session">
                        <h2>
                            <span className="uclogin" onClick={this.tologin}>UC登录</span>
                            <span className="reg">注册</span>
                        </h2>
                        <div className="tab-content">
                            <input type="text" placeholder="字母/数字/下划线组合" className="loginName" value={this.state.username} onChange={this.userInput.bind(this)} onBlur={this.loginJudge.bind(this)}/>
                            <input type="password"placeholder="请输入密码" className="pwd" value={this.state.password} onChange={this.pwdInput.bind(this)}/>
                        </div>
                        <div className="lable" ref="zcbtn" onClick={this.register.bind(this)}>注  册</div>          
                        <p className="forget_pwd">注册即同意《UC服务协定》</p>
                    </div>
                    <div className="hint" ref="tisi" style={{display:"none"}}>帐号必须由数字字母或下划线组成..
                        <span></span>
                        <i></i>
                    </div>
                    <div className="hint" ref="hints" style={{display:"none"}}>这个帐号太多人用了，亲请换一个吧..
                        <span></span>
                        <i></i>
                    </div>
                </div>
                <FootNav/>
            </div>
        );
    }
};

export default Register;