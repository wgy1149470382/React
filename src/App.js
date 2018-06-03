import React, { Component } from 'react';
import './App.css';

import FootNav from './components/main/footnav.js';
import Requests from './util/httpclient.js';


import Swiper from 'swiper';

class App extends Component {
    static defaultProps = {
       menu: ['帐号','游戏币','道具','苹果代充','代练','礼包','充值中心','首充号','端游','王者荣耀']
    }
    state = {
        select:['热','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','W','X','Y','Z'],
        ulike:[
                {text:'[问道【苹果版】]【苹果代充6480元宝】',price:'3650'},
                {text:'[大话西游]充10000元带奖励可代充续充',price:'7300'},
                {text:'[大话西游]充10元带奖励可代充续充',price:'530'},
                {text:'[皇室战争【苹果版】]【苹果代充2500宝石',price:'7.3'},
                {text:'[皇室战争【苹果版】]【苹果代充6500宝石】',price:'5'}
        ],
        announcement:[
                '【代练】打手接单赢取888元现金！',
                '【公告】交易服务费收费标准及到账模式说明！',
                '【活动】交易猫新游商品预售',
                '【担保】游戏开通担保交易服务啦！',
                '【公告】交易猫全面启用在线客服发货！'
        ],
        keyword:''
    }
    loginUser(){
        if(this.refs.dlbtn.innerHTML==='登录'){
            this.props.history.push({'pathname':'/login'})
        }else{
            this.props.history.push({'pathname':'/my'})            
        }
    }
    transmit(e){
        if(e.target.tagName==='LI'){
            this.props.history.push({
                'pathname':'/sort',
                'state':{"letter":e.target.innerHTML}
            })
        }
    }
    changeval(e){
        this.setState({
            keyword:e.target.value
        })
    }
    ksGame(){
        if(this.state.keyword!==''){
             this.props.history.push({
                'pathname':'/sort',
                'state':{"keyword":this.state.keyword}
            })  
        }
             
    }
     componentDidMount(){
        // console.log(this.props)
        var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction:false,
        },
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
        //判断是否登录
        let changeThis = this;
        //this 赋值变量 后面调用 因为后面的this已经改变
        let token = localStorage.getItem("jymUserToken") || null;
        
        Requests.ajax({
            "method":"POST",
            "url":"/mine/userCenter",
            "set":{"Content-Type":"application/x-www-form-urlencoded","auth":token},
            "send":{
                "token":token
            }
        }).then(function(res){            
            if(res.body.msg==='unauth'){
                changeThis.refs.dlbtn.innerHTML='登录'       
            }else{
                changeThis.refs.dlbtn.innerHTML='个人中心'     
            }
        });        
     }
    render() {
        return (
            <div className="App flexbox animate-route">
                <div className="container">
                    <header className="head">
                        <h1></h1>
                        <div className="login" ref="dlbtn" onClick={this.loginUser.bind(this)}>登录</div>
                        <div className="sell">我要卖</div>
                    </header>
                    <div className="banner">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <img src={require("./img/banner1.jpg")} alt=""/>
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("./img/banner2.jpg")} alt=""/>
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("./img/banner3.jpg")} alt=""/>
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("./img/banner4.jpg")} alt=""/>
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("./img/banner5.jpg")} alt=""/>
                                </div>
                            </div>

                            <div className="swiper-pagination"></div>
                            
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </div>
                        
                    </div>
                    <div className="simple-text">
                        <a href="">打手代练接单赢取888元现金</a>
                    </div>
                    <div className="search">
                        <input type="text" className="sousuo"placeholder="请输入游戏/店铺" value={this.state.keyword} onChange={this.changeval.bind(this)}/>
                        <input type="button" value="快搜" className="kuaisou" onClick={this.ksGame.bind(this)}/>
                    </div>
                    <div className="main">
                        <ul className="home-menu">
                           {
                            this.props.menu.map(function(item,index){
                                return <li key={index}><span></span><span>{item}</span></li>
                            })
                           }                               
                        </ul>
                        <ul className="select" onClick={this.transmit.bind(this)}>
                            {
                                this.state.select.map(function(item,index){
                                return <li key={index}>{item}</li>
                            })
                            }
                        </ul>
                        <ul className="game-list">
                            <li><img src="http://static.jiaoyimao.com/resource/public/game/2015/3/9/1eb61bdf-fba7-4d04-ba75-a7a742d14ae4.gif" alt=""/><span>艾琳传奇</span></li>
                            <li><img src="https://static.jiaoyimao.com/resource/public/game/2018/5/2/3eb9c584-4d31-4586-8f8e-eed645f9fd17.jpg" alt=""/><span>暗夜格斗</span></li>
                            <li><img src="https://static.jiaoyimao.com/resource/public/gnk/2017/7/25/a2e2b4c4-66ad-4806-8e10-365722afc0ea.jpg" alt=""/><span>王者荣耀</span></li>
                            <li><img src="https://static.jiaoyimao.com/resource/public/gnk/2018/2/2/11d9abdb-b955-41c2-a724-c058d575f30c.jpg" alt=""/><span>QQ飞车手游</span></li>
                            <li><img src="https://static.jiaoyimao.com/resource/public/gnk/2016/9/5/c3c73b04-f1dc-45c7-a10d-cbc1cfe3b022.jpg" alt=""/><span>梦幻西游</span></li>
                            <li><img src="https://static.jiaoyimao.com/resource/public/gnk/2015/12/25/3f75c443-cd16-45aa-ad50-9df3eb5c5381.jpg" alt=""/><span>热血传奇安卓版</span></li>
                            <li><img src="https://static.jiaoyimao.com/resource/public/gnk/2017/1/20/8d7c83d2-fda8-4c13-bfac-cc7e87366ed9.gif" alt=""/><span>阴阳师</span></li>
                            <li><img src="https://static.jiaoyimao.com/resource/public/gnk/2016/9/5/dff55f57-b934-4ae9-91ed-fbfcc4e139a2.gif" alt=""/><span>大话西游</span></li>                           
                        </ul>
                        <ul className="source-enters">
                            <li>
                                <div className="source-enters-left">
                                    <span>曙光守护者</span>
                                    <p>5折限时秒杀</p>
                                </div>
                                <div className="source-enters-right">
                                    <img src="https://static.jiaoyimao.com/resource/public/gnk/2018/5/7/239e83e4-9f99-42b2-90c5-7e49321c25b0.png"alt=""/>
                                </div>
                            </li>
                            <li>
                                <div className="source-enters-left">
                                    <span>爆款新游</span>
                                    <p>超值豪华礼包</p>
                                </div>
                                <div className="source-enters-right">
                                    <img src="https://static.jiaoyimao.com/resource/public/gnk/2018/4/4/ac5513c9-55c8-44c1-b96d-033e33339174.png"alt=""/>
                                </div>
                            </li>
                            <li>
                                <div className="source-enters-left">
                                    <span>接单代练</span>
                                    <p>接单赢888现金</p>
                                </div>
                                <div className="source-enters-right">
                                    <img src="https://static.jiaoyimao.com/resource/public/gnk/2017/12/21/2dbb0e0b-0df0-4291-8d43-031f503f1685.png"alt=""/>
                                </div>
                            </li>
                            <li>
                                <div className="source-enters-left">
                                    <span>特卖专区</span>
                                    <p>超性价比首充号</p>
                                </div>
                                <div className="source-enters-right">
                                    <img src="https://static.jiaoyimao.com/resource/public/gnk/2017/12/21/bbcdcee7-0871-4e89-9cf5-5d9d5e26632f.png"alt=""/>
                                </div>
                            </li>
                        </ul>
                        <dl className="guess-u-like">
                            <dt>猜你喜欢</dt>
                            <dd>[崩坏3]8000水晶5补给，秒发货4<span>￥1.2</span></dd>
                            {
                                this.state.ulike.map(function(item,index){
                                    return  <dd key={index}>{item.text}
                                                <span>￥{item.price}</span>
                                            </dd>
                                })
                            }
                        </dl>
                        <dl className="link-module">
                            <dt>公告<span>更多></span></dt>
                            {
                                this.state.announcement.map(function(item,index){
                                return <dd key={index}>{item}</dd>
                            })
                            }
                        </dl>
                        <ul className="con-module">
                            <li>交易猫客服验证<span> 更多安全知识>> </span></li>
                            <li>
                                <input type="text" placeholder="请输发货客服QQ号" className="qq-input"/>
                                <input type="button" value="验证" className="qq-btn"/>
                            </li>
                            <li>
                                <input type="text" placeholder="请输入要验证的链接" className="lj-input"/>
                                <input type="button" value="验证" className="lj-btn"/>   
                            </li>
                        </ul>
                        <div className="game-list-new">
                            <h3>最值得玩的游戏</h3>
                            <ul>
                                <li>
                                    <img src="https://static.jiaoyimao.com/resource/public/gnk/2016/9/5/c3c73b04-f1dc-45c7-a10d-cbc1cfe3b022.jpg" alt=""/>
                                    <span>梦幻西游</span>
                                </li>
                                <li>
                                    <img src="https://static.jiaoyimao.com/resource/public/gnk/2016/9/5/dff55f57-b934-4ae9-91ed-fbfcc4e139a2.gif" alt=""/>
                                    <span>大话西游</span>
                                </li>
                                <li>
                                    <img src="https://static.jiaoyimao.com/resource/public/game/2017/4/25/2c097ce6-9028-4518-9a74-051e09e2eb01.gif" alt=""/>
                                    <span>蜀门手游</span>
                                </li>
                                <li>
                                    <img src="https://static.jiaoyimao.com/resource/public/game/2016/6/30/e9ac6754-1324-4cb0-ac4e-9628b5afb1cb.jpg" alt=""/>
                                    <span>永恒纪元：戒</span>
                                </li>
                            </ul>                            
                        </div>
                        <div className="game-list-new">
                            <h3>店铺推荐</h3>
                            <ul className="shop-list">
                                <li>
                                    <img src="https://static.jiaoyimao.com/resource/public/shop/2017/9/30/82809b9c-325d-4881-9777-66da35fcee42.jpg" alt=""/>
                                    <span>少年手游店</span>
                                </li>
                                <li>
                                    <img src="https://static.jiaoyimao.com/resource/public/shop/2017/8/8/dcf70142-1859-4f96-bead-37de3e907bb9.png" alt=""/>
                                    <span>海盗游戏交易</span>
                                </li>
                                <li>
                                    <img src="https://static.jiaoyimao.com/resource/public/shop/2017/9/30/02c0d1a5-aebb-49d3-9fa4-f3e43da4a5ea.jpg" alt=""/>
                                    <span>霸气手游金店</span>
                                </li>
                            </ul>
                        </div>
                        <div className="game-list-new">
                            <h3>合作伙伴</h3>
                            <ul className="partner">
                                <li>
                                    <img src="https://image.jiaoyimao.com/public/touch/images/shell.png?2018051216" alt=""/>
                                </li>
                                <li>
                                    <img src="https://image.jiaoyimao.com/public/touch/images/9g_logo.png?2018051216" alt=""/>
                                </li>
                                <li>
                                    <img src="https://image.jiaoyimao.com/public/touch/images/9client_logo.png?2018051216" alt=""/>
                                </li>
                            </ul>
                        </div>
                        <div className="footer">
                            <ul>
                                <li>在线客服<a>点击咨询</a></li>
                                <li>7*24小时服务</li>
                                <li>www.jiaoyimao.com</li>
                                <li>粤ICP备14053110号-1</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <FootNav/>
            </div>
        );
    }
}

export default App;
  
