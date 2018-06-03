import '../../css/cmp_my.css';

import React, { Component } from 'react';
import Requests from "../../util/httpclient.js";
import FootNav from '../main/footnav.js';

class CmpMy extends Component{
    state = {
        username:'',
        QQnum:'',
        phonenum:'',
        Dynamic:0
    }

    componentWillMount(){
        let changeThis = this;
        //this 赋值变量 后面调用 后面的this已经改变
        let token = localStorage.getItem("jymUserToken") || null;
        
        Requests.ajax({
            "method":"POST",
            "url":"/mine/userCenter",
            "set":{"Content-Type":"application/x-www-form-urlencoded","auth":token},
            "send":{
                "token":token
            }
        }).then(function(res){
            // console.log(res);
            if(res.body.msg==='unauth'){
                changeThis.props.history.push({'pathname':'/login'});
                //判断没有登录状态，没有登录跳回登录。
            }else{
                if(res.body.data[0].uQQ===''){
                     res.body.data[0].uQQ ='尚未填写'  
                }
                if(res.body.data[0].uphone===''){
                     res.body.data[0].uphone ='尚未填写'                       
                }
                changeThis.setState({
                    username:res.body.data[0].uname,
                    QQnum:res.body.data[0].uQQ,
                    phonenum:res.body.data[0].uphone,
                    Dynamic:res.body.data[0].tradeCount

                })
            }
        });        
    }
    back(){
        this.props.history.goBack();
    }
    fnlogout = () => {
        window.localStorage.removeItem("jymUserToken");
        this.props.history.push({"pathname":"/"});
    }
    render(){
        return (
            <div className="jym_my flexbox animate-route">
                <div className="container">
                    <div className="header">
                        <i onClick={this.back.bind(this)}></i>
                        个人中心
                    </div>
                    <div className="my-center">
                        <div className="news">
                            <div className="news-head">
                                未读消息：
                                <span>2条</span>
                                <div className="ck-btn">查看</div>
                            </div>
                            <ul className="message-info">
                                <li>交易动态：<span>{this.state.Dynamic}条</span></li>
                                <li>资金：<span>0条</span></li>
                                <li>商品信息：<span>0条</span></li>
                                <li>个人信息：<span>2条</span></li>                            
                            </ul>
                        </div>
                        <ul className="login-module">
                            <li>昵称：<span>{this.state.username}</span></li>
                            <li>QQ号：<span>{this.state.QQnum}</span><div>修改</div></li>
                            <li>实人认证：<span>未认证</span><div>认证</div></li>
                            <li>手机号：<span>{this.state.phonenum}</span><div>绑定</div></li>    
                        </ul>
                        <div className="Account-number">
                            <h3>收款帐号：<span>尚未设置</span></h3>
                            <ul>
                                <li className="highlight">设置</li>
                                <li>充值</li>
                                <li>提现</li>                                
                            </ul>
                        </div>
                        <div className="buyer-management">
                            <h2>买家管理</h2>
                            <ul>
                                <li>
                                    <span></span>
                                    <p>未支付<span>(0)</span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>待发货<span>(0)</span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>全部订单<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>代金券<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我的收藏<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我的出价<span></span></p>
                                </li>                                
                            </ul>
                        </div>
                        <div className="buyer-management Seller">
                        <h2>卖家管理 <span>我要卖</span></h2>
                            <ul>
                                <li>
                                    <span></span>
                                    <p>已经发货<span>(0)</span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>交易中<span>(0)</span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>全部订单<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>代金券<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我的收藏<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我的出价<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我的出价<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我的出价<span></span></p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我的出价<span></span></p>
                                </li>                                               
                            </ul>
                        </div>
                        <div className="buyer-management">
                            <h2>代练管理</h2>
                            <ul>
                                <li>
                                    <span></span>
                                    <p>代练发布管理</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>代练接单管理<span>(0)</span></p>
                                </li>
                            </ul>
                        </div>
                        <div className="buyer-management store-management">
                            <h2>店铺管理</h2>
                            <ul>
                                <li>
                                    <span></span>
                                    <p>我的店铺</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>我要进货</p>
                                </li>
                            </ul>
                        </div>
                        <div className="log-out" onClick={this.fnlogout}>退出登录</div>                                                          
                    </div>
                </div>
                <FootNav/>
            </div>
        );
    }
};

export default CmpMy;