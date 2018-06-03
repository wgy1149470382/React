import React from 'react'

import Requests from '../../util/httpclient.js';
import FootNav from '../main/footnav.js';
import '../../css/pay.css'

import Background from '../../img/icon.png'
import Arrow from '../../img/arrow.png'
const alipay = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')'
}
const weixin = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')'
}
const arrow = {
    backgroundSize: '0.213333rem 0.346667rem',
    backgroundImage: 'url(' + Arrow + ')'
}
const jiantou = {
    backgroundSize: '11.866667rem 11.493333rem',
    backgroundImage: 'url(' + Background + ')'
}


class Pay extends React.Component{
    state = {
        data:[],
        id:window.location.search.slice(5),
        qty:0
    }
    componentDidMount(){
        this.setState({qty:this.props.location.state.qty}); 
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
        return Object.keys(item)
    }
    //支付
    payment(e){
        if(e.target.className === 'zfb'){
            document.querySelector('.dialog-box').style.display = 'block'
            document.querySelector('.overlay').style.display = 'block'
            document.querySelector('.win').style.display = 'none';
            document.querySelector('.hint').innerHTML = '请确认支付宝支付是否完成'
        }
        if(e.target.className === 'wx'){
            document.querySelector('.dialog-box').style.display = 'block'
            document.querySelector('.overlay').style.display = 'block'
            document.querySelector('.win').style.display = 'none';
            document.querySelector('.hint').innerHTML = '请确认微信支付是否完成'
        }
    }

    action(e){
        if(e.target.className === 'finish'){
            document.querySelector('.win').style.display = 'block';
            document.querySelector('.win').innerHTML = 'loading....';
            // let that = this;
            let token = localStorage.getItem("jymUserToken") || null;
            Requests.ajax({
                "method":"POST",
                "url":"/mine/tradeCount",
                "set":{"Content-Type":"application/x-www-form-urlencoded","auth":token},
                "send":{
                    "token":token,
                    "_id":this.state.id,
                    "tempNum":this.state.qty
                }
            }).then((res)=>{
                // console.log(res.body.msg)
                if(res.body.msg === 'updated'){
                    setTimeout(()=>{
                        document.querySelector('.win').innerHTML = '√ 你已完成支付'
                        
                        if(document.querySelector('.win').innerHTML === '√ 你已完成支付'){
                            setTimeout(()=>{
                            document.querySelector('.dialog-box').style.display = 'none'
                            document.querySelector('.overlay').style.display = 'none'
                            document.querySelector('.win').style.display = 'none';
                            this.props.history.push({"pathname":"/my"})
                            },2000)
                        }
                        
                    },3000)
                    
                }else{
                    alert('亲，请先登录哦')
                    this.props.history.push('/')
                }
            });
            
        }
        if(e.target.className === 'abolish'){
            document.querySelector('.dialog-box').style.display = 'none'
            document.querySelector('.overlay').style.display = 'none'
        }

    }

    modification(){
        this.props.history.push({"pathname":"/affirm","search":"?id="+this.state.id})
    }
    back(){
        this.props.history.goBack()
    }

    render(){
        return (
            <div className="Pay">
                <div className="module-title fui-border-b-linght">
                <h2>选择支付方式</h2>
                <a className="btn-sale" onClick={this.modification.bind(this)}>修改订单</a>
                <a className="backbtn">
                <i className="fui-back-arr" style={jiantou} onClick={this.back.bind(this)}></i>
                </a>
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
                </div>
                <div className="propmt-info">
                <span className="c-red">订单有效支付时间30分钟</span>
                </div>
                <ul className="new-list-link" onClick={this.payment.bind(this)}>
                <li className="Alipay"><button className="zfb"><i className="icon-alipay" style={alipay}></i>支付宝</button>
                <i className="arrow" style={arrow}></i>
                </li>
                <li className="Alipay"><button className="wx"><i className="icon-weixin" style={weixin}></i>微信<p className="service">微信公司加收<span>{this.state.data.infos ? (this.state.data.infos.price*0.007).toFixed(2) : null}元</span>手续费</p></button>
                <i className="arrow" style={arrow}></i>
                </li>
                </ul>
                
                </div>
                <div className="dialog-box" onClick={this.action.bind(this)}>
                    <div className="bd">
                    <p className="hint">请确认微信支付是否完成</p>
                    <ul>
                    <li className="finish">已完成支付</li>
                    <li className="abolish">老婆不让买了</li>
                    <strong className="win">√ 你已完成支付</strong>
                    </ul>
                    </div>
                </div>
                <div className="overlay"></div>
                <FootNav />
            </div>
        )
    }


}

export default Pay