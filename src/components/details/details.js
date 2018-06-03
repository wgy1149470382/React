import React from 'react'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import '../../css/details.css'

import FootNav from '../main/footnav.js';
import Requests from '../../util/httpclient.js';

//引入图片
import Background from '../../img/icon.png'
import wgy from '../../img/wgy.jpg'
import Icon from '../../img/icon2.png'
import Jmore from '../../img/sprite.png'
const jiantou = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')'
}
const zhanghao = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')',
}
const jmore = {
    backgroundSize: '1.92rem 1.546667rem',
    backgroundImage: 'url(' + Jmore + ')',
}
const android = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')',
}
const trumpet = {
    backgroundSize: '13.2rem 12.586667rem',
    backgroundImage: 'url(' + Icon + ')',
}
const leave = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')',
}
const collect = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')',
}


var id;
class Details extends React.Component{
    state = {
        data:[],
        id:window.location.search.slice(5)
    }

    componentWillMount(){

    }

    componentDidMount(){  
        // console.log(this.state.id)
        Requests.ajax({
            "method":"GET",
            "url":"/product?_id="+this.state.id
        }).then((res) => {
            this.setState({
                data:res.body.data[0],
            })
            // console.log(this.state.data);
            // 5afb971e3037c5f971386ff7
            
        });

        var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationType: 'custom',
                paginationClickable: true,
                // freeMode:true,
                loop: true,
                speed: 600,
                autoplay: 3000,
                observeParents: true,
                //修改swiper自己或子元素时，自动初始化swiper
                observer: true,
            });

    }


    getKeys(item = {}){
        return Object.keys(item);
    }

    //立即购买
    goAffirm(){
            let token = localStorage.getItem("jymUserToken") || null;
            Requests.ajax({
                "method":"POST",
                "url":"/mine/userToken",
                "set":{"Content-Type":"application/x-www-form-urlencoded","auth":token},
                "send":{"token":token}
            }).then((res)=>{
                // console.log(res.body.msg)
                if(res.body.msg === 'auth'){
                    this.props.history.push({"pathname":"/Affirm","search":"?_id="+this.state.id})
                    
                }else{
                    alert('亲，请先登录哦')
                    this.props.history.push({
                        "pathname":"/login",
                        "state":{"path":this.props.location.pathname+this.props.location.search}
                    })
                }
            });
        
    }

    //返回
    back(){
        this.props.history.goBack()
    }

    //查看图片
    watchZoom(e){
        document.querySelector('.watch-zoom').style.display = 'block';
    }

    //关闭遮罩
    watchClose(e){
        if(e.target.tagName.toLowerCase()==='img'){
            document.querySelector('.watch-zoom').style.display = 'none';
        }
        
    }

    collect(){
        alert('喜欢我就赶紧买吧，别收藏啦^_^')
    }

    render(){
        return (
            <div className="Details animate-route">
                    <div className="module-title fui-border-b-linght">
                        <h2>商品详情</h2>
                            <a className="backbtn"><i className="fui-back-arr" style={jiantou} onClick={this.back.bind(this)}></i></a>
                    </div>
                <div className="container">
                    <div className="product-photo">
                    <div className="content">
                    <img data-image={this.state.data.infos ? this.state.data.infos.img : null} alt="" src={this.state.data.infos ? this.state.data.infos.img : null}  onClick={this.watchZoom.bind(this)}/><span className="">点击查看</span>
                    </div>
                    </div>
                    <div className="product-detail">
                        <div className="part1">
                        <h1><i title="游戏帐号类的商品" className="icon-badge-1" style={zhanghao}></i>{this.state.data.infos ? this.state.data.infos.name : null}</h1>
                        <div className="meta clearfix">
                        <div className="price">
                            <span>￥
                                {this.state.data.infos ?  this.state.data.infos.price : null}
                            </span>
                        </div>
                        <div className="times">首次出售</div>
                        </div>
                        <a className="list-item safe goods-security-icons"> 
                        <div className="security-title">认证信誉</div>
                        <div className="security-icons">
                        <span><i className="icon-id-certification"></i>实人认证</span>
                        <span><i className="icon-shiming"></i>实名认证</span></div>
                        <b className="jmore" style={jmore}></b>
                        </a>
                        <a className="list-item safe goods-security-icons">
                    <div className="security-title">商品保障</div>
                    <div className="security-icons">
                    <span><i className="icon-jishou"></i>平台发货</span>
                    </div>
                    <b className="jmore" style={jmore}></b>
                    </a>
                    <span className="list-item">
                    <span>操作系统</span>
                    <span>{this.state.data.infos ? this.state.data.infos.OS : null}<i className="icon-android" style={android}></i></span></span></div>
                    </div>
                    <div className="part2">
                    <ul className="tab-header">
                    <li className="active" data-tab="tab-info">商品信息</li>
                    <li data-tab="tab-exp" className="">交易说明</li>
                    </ul>
                    <div className="tab-panels">
                    <div className="tab-item info-tab active">
                    <div className="info">
                    <ul className="info-list">
                    {
                        this.getKeys(this.state.data.detail).map((item,idx)=>{

                            return <li key={idx}><span>{item}</span><span>
                            {
                                <a>{this.state.data.detail[item]}</a>  
                            }
                           </span></li>
                        })
                    }
                    </ul>
                    <div className="xianyu-buyer-alert">
                        <i className="icon icon-xianyu-buyer-alert" style={trumpet}></i>请勿私下联系卖家交易，防止被骗</div>
                    </div>
                    </div>
                    </div>
                    <div className="shop-info-card clearfix">
                    <div className="shop-intro clearfix">
                        <img src={wgy} alt=""/>
                    
                    <dl>
                    <dt>
                    张学友金店
                    <span className="credit-level"><span className="level-2" style={leave}></span><span className="level-2" style={leave}></span><span className="level-2" style={leave}></span><span className="level-2" style={leave}></span><span className="level-2" style={leave}></span><span className="level-2" style={leave}></span><span className="level-2" style={leave}></span><span className="level-2" style={leave}></span></span>
                    </dt>
                    <dd>
                    更多【好玩手游】商品尽在店铺里
                    </dd>
                    </dl></div>
                    </div>
                    <div className="propmt-info">
                    <p>
                    <span>免责声明</span><br/>
                    1.所展示的商品供求信息由买卖双方自行提供，其真实性、准确性和合法性由信息发布人负责。<br/>
                    2.国家法律规定，未成年人不能参与虚拟物品交易。<br/>
                    3.本平台提供的数字化商品根据商品性质不支持七天无理由退货服务。
                    </p>
                    </div>
                </div>
                <FootNav />
                </div>
                <div className="fui-btn-fixed-bottom">
                <button className="fui-btn fui-btn-secondary J-favorite" onClick={this.collect.bind(this)}><i className="fui-icon-block fui-icon-favorite" style={collect}></i>收藏</button>
                <button className="fui-btn fui-btn-lg fui-btn-primary fui-btn-flex" onClick={this.goAffirm.bind(this)}>立即购买</button>
                </div>
            <div className="watch-zoom" onClick={this.watchClose.bind(this)}>
                <div className="swiper-container">
                <div className="swiper-wrapper">
                <div className="swiper-slide"><img src={this.state.data.infos ? this.state.data.infos.img : null} alt="" /></div>
                <div className="swiper-slide"><img src="https://static.jiaoyimao.com/resource/public/goodsinfo/2018/5/12/b7dfddd9-82a5-46d0-825b-97bb00fbb171.jpg" alt="" /></div>
                <div className="swiper-slide"><img src="https://static.jiaoyimao.com/resource/public/goodsinfo/2018/5/14/c7b0a2b1-8370-4c0f-893c-8c727c9717dd.jpg" alt="" /></div>
                <div className="swiper-slide"><img src="https://static.jiaoyimao.com/o/gcmall/3tGrA/;;0,gcmall/g/resource/public/goodsinfo/2018/4/1/48087e78-5365-47f2-9189-d344087dd4ba.jpg" alt="" /></div>
                <div className="swiper-slide"><img src="https://static.jiaoyimao.com/resource/public/goodsinfo/2018/5/12/b7dfddd9-82a5-46d0-825b-97bb00fbb171.jpg" alt="" /></div>
                </div>
                <div className="swiper-pagination">
                <span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
                <span className="swiper-pagination-bullet"></span>
                <span className="swiper-pagination-bullet"></span>
                <span className="swiper-pagination-bullet"></span>
                <span className="swiper-pagination-bullet"></span>
                </div>
                <div className="image-zoom-security-tips"><i className="icon-imagezoom-security" style={collect}></i>如有联系方式均为骗子，请勿上当</div>
            </div>
            </div>
            </div>
        )
    }
}

export default Details