import React from 'react'

import Requests from '../../util/httpclient.js';
import FootNav from '../main/footnav.js';
import '../../css/affirm.css'

import Background from '../../img/icon.png'
import Arrow from '../../img/arrow.png'
const jiantou = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')'
}
const arrow = {
    backgroundSize: '0.213333rem 0.346667rem',
    backgroundImage: 'url(' + Arrow + ')'
}


class Affirm extends React.Component{
    state = {
        data:[],
        qty:1,
        id:window.location.search.slice(5),
        uphone:"",
        uQQ:""
    }

    componentDidMount(){
        let token = localStorage.getItem("jymUserToken") || null;
        Requests.ajax({
            "method":"POST",
            "url":"/mine/userCenter",
            "set":{"Content-Type":"application/x-www-form-urlencoded","auth":token},
            "send":{"token":token}
        }).then((res)=>{
            this.setState({
                "uQQ":res.body.data[0].uQQ,
                "uphone":res.body.data[0].uphone
            })
        })

        Requests.ajax({
            "method":"GET",
            "url":"/product?_id="+this.state.id
        }).then((res) => {
            this.setState({
                data:res.body.data[0],
            })
            // console.log(this.state.data);
            
        });
    }

    getKeys(item = {}){
        return Object.keys(item);
    }

    //返回
    back(){
        this.props.history.goBack()
    }

    buy(){
        var check1 = false;
        var check2 = false;
        if(document.getElementById('phone').value===''){
            document.querySelector('.proPhone').style.display = 'block';
            document.querySelector('.proPhone').innerHTML="不能为空"
            check1 = false;
        }else if(document.getElementById('phone').value.length!==11){
            document.querySelector('.proPhone').style.display = 'block';
            document.querySelector('.proPhone').innerHTML="不是11位全数字"
            check1 = false
        }else{
            document.querySelector('.proPhone').style.display = 'none';
            check1 = true;
        }
        
        if(document.getElementById('QQ').value===''){
            document.querySelector('.proQQ').style.display = 'block';
            check2 = false
        }else if(document.getElementById('QQ').value.length<6||document.getElementById('QQ').value.length>10){
            document.querySelector('.proQQ').style.display = 'block';
            document.querySelector('.proQQ').innerHTML="你这不是QQ号"
            check2 = false
        }else{
            document.querySelector('.proQQ').style.display = 'none';
            check2 = true
        }
        //总
        if(check1&&check2){
            let that = this;
            let token = localStorage.getItem("jymUserToken") || null;
            Requests.ajax({
                "method":"POST",
                "url":"/mine/writeUserdata",
                "set":{"Content-Type":"application/x-www-form-urlencoded","auth":token},
                "send":{
                    "uQQ":that.state.uQQ,
                    "uphone":that.state.uphone,
                    "token":token
                }
            }).then((res)=>{
                this.props.history.push({
                    "pathname":"/pay",
                    "search":"?_id="+this.state.id
                    ,"state":{"_id":this.state.id,"qty":this.state.qty}
                })
            })

           
        } 

    }

    calculate(e){
        if(e.target.dataset.types === "qty"){
            this.setState({
                qty:e.target.value,
            })
        }else if(e.target.id === "QQ"){
            this.setState({
                uQQ:e.target.value,
            })
        }else if(e.target.id === "phone"){
            this.setState({
                uphone:e.target.value,
            })
        }

    }

    
    render(){
        return (
            <div className="Affirm">
                <div className="module-title fui-border-b-linght">
                        <h2>购买确认</h2>
                            <a className="backbtn"><i className="fui-back-arr" style={jiantou} onClick={this.back.bind(this)}></i></a>
                </div>
            <div className="container">
                <div className="sub-con full-con">
                <dl className="list-detail">
                {
                    this.getKeys(this.state.data.detail).map((item,idx)=>{
                        return <dd key={idx}><span className="title">{item}</span><span>{this.state.data.detail[item]}</span></dd>
                    })
                }
                </dl>
                <div className="safe-info"><a href="https://m.jiaoyimao.com/goods/toSave?isZhimaCertification=false&amp;realName=true&amp;isPromoterSeller=true&amp;isTransfer=false&amp;isOfficialShopGoods=false&amp;isAssurance=true" className="list-item safe goods-security-icons">
                <div className="security-title">认证信誉</div>
                <div className="security-icons"><span><i className="icon-shiming"></i>实名认证</span>
                    </div><i className="arrow" style={arrow}></i>
                    </a>
                    <a rel="nofollow" className="list-item safe goods-security-icons">
                <div className="security-title">商品保障</div>
                <div className="security-icons"><span><i className="icon-assurance"></i>卖家发货</span></div><i className="arrow" style={arrow}></i>
                    </a>
                    </div>
                    <dl className="list-detail">
                    <dd><span className="title">当前库存</span><span>99999+</span>
                    </dd>
                    <dd><span className="title">单价</span><span className="c-red">{this.state.data.infos ? this.state.data.infos.price :null}元</span>
                    </dd>
                    </dl>
                    <p className="propmt-info"><span>请输入您的收货信息，确保到达；</span></p>
                    </div>
                    <div className="sub-con sub-con-from-control-group full-con">
                    <div className="form-control">
                    <label className="label key title">手机号码</label>
                    <span className="input-text">
                    <input type="tel" name="手机号码" placeholder="请输入手机号码" contenttype="10" id="phone" value={this.state.uphone} onChange={this.calculate.bind(this)}/></span>
                    </div>
                    <div className="prompt proPhone" name="errorTips">不能为空<em className="trian"></em></div>
                    <div className="form-control">
                    <label className="label key title">联系QQ</label>
                    <span className="input-text">
                    <input type="tel" name="手机号码" placeholder="请输入联系QQ" contenttype="10" id="QQ" value={this.state.uQQ} onChange={this.calculate.bind(this)}/></span>
                    </div>
                    <div className="prompt proQQ" name="errorTips">不能为空<em className="trian"></em></div>
                    <div className="form-control">
                    <label className="label key title">卖家QQ</label>
                    <span className="input-text">
                    <input type="tel" name="手机号码" placeholder="没有就不填" contenttype="10"/></span>
                    </div>
                    <p className="propmt-info"><span>如您与卖家约好交易该商品，请输入卖家QQ</span></p>
                    <div className="form-control nomargin">
                    <label className="label key title">购买数</label>
                    <span className="input-text">
                    <input type="tel" contenttype="10" data-types="qty" value={this.state.qty} onChange={this.calculate.bind(this) }/></span>
                    </div>
                     <div className="form-control nomargin">
                    <label className="label key title">原价格</label>
                    <span className="input-text">{this.state.data.infos ? this.state.qty*this.state.data.infos.price : null}元
                    </span>
                    </div>
                     <div className="form-control nomargin">
                    <label className="label key title">实付价</label>
                    <span className="input-text out-of-pocket">{this.state.data.infos ? this.state.qty*this.state.data.infos.price : null}元
                    </span>
                    </div>
                    <div className="argee"><input className="checkbox" type="checkbox" name="agree" />
                        <a href="https://m.jiaoyimao.com/agreement">《交易猫手机网游服务平台服务协议》</a>
                    </div>
                    <div className="sub-con full-con">
                    <button className="btn-blue" onClick={this.buy.bind(this)}>确认购买</button>
                    </div>
                    </div>
                    <p className="propmt-info"><span>
                    【寄售交易】卖家商品信息已提交我们平台，确保支付后立刻处理发货（7*24小时服务）。
                    </span></p>
                    
                    </div>
                    <FootNav />
            </div>
        )
    }
}

export default Affirm;