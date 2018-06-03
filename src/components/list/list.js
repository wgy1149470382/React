import '../../css/cmp_list.css';

import React, { Component } from 'react';

import Requests from '../../util/httpclient.js';
import FootNav from '../main/footnav.js';

class CmpList extends Component{
     show(e){
         if(this.state.status === 0){
            e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display = 'block';
            this.setState({status: 1});
        }else{
             e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display = 'none';
             this.setState({status: 0});
        }
    }
    state = {
        data: [],
        status: 0
    }
     componentDidMount(){
        // console.log(this)
        // console.log(this.props.location.search.slice(6))
        Requests.ajax({
            "method":"POST",
            "url":"/list",
            "set":{"Content-Type":"application/x-www-form-urlencoded"},
            "send":{"gameName":"绝地求生（PUBG）"}
        }).then((res) => {
            this.setState({
                data: res.body.data
            })
        })
    }
    //返回
     back(){
        this.props.history.goBack()
    }
    //排序
    rank=(e)=>{
        if(e.target.className=== "jiang"){
            let nav2 = document.querySelector('.nav2');
            nav2.style.display="none";
            var goodslist=this.state.data;
            for(var i=0;i<goodslist.length;i++){
                for(var j=0;j<goodslist.length-1;j++){
                    if(Number(goodslist[j].infos.price)<Number(goodslist[j+1].infos.price)){
                        let temp =goodslist[j];
                        goodslist[j] = goodslist[j+1];
                        goodslist[j+1] = temp;
                    }
                }
            }  
            let list_count = document.querySelector('.list_count');
            list_count.innerHTML = goodslist.map(item=>{
                return `<ul>
                            <li data-id=${item._id}>
                                <p  class="ming">${item.infos.name}</p>
                                <img src=${item.infos.img} alt=""/>
                                <p class="server">${item.infos.account}<span> | ${item.infos.server}</span></p>
                                <p class="price">&yen;${item.infos.price}</p>
                            </li>
                        </ul>
                    `
                        }).join('')
         }  
        else if(e.target.className=== "sheng"){
            let nav2 = document.querySelector('.nav2');
            nav2.style.display="none";
            var goods=this.state.data;
            for(var k=0;k<goods.length;k++){
                for(var l=0;l<goods.length-1;l++){
                    if(Number(goods[l].infos.price)>Number(goods[l+1].infos.price)){
                        let temp =goods[l];
                        goods[l] = goods[l+1];
                        goods[l+1] = temp;
                    }
                }
            }  
            let list_count = document.querySelector('.list_count');
             list_count.innerHTML = goods.map(item=>{
                return `<ul>
                            <li data-id=${item._id}>
                                <p  class="ming">${item.infos.name}</p>
                                <img src=${item.infos.img} alt=""/>
                                <p class="server">${item.infos.account}<span> | ${item.infos.server}</span></p>
                                <p class="price">&yen;${item.infos.price}</p>
                            </li>
                        </ul>
                    `
                        }).join('')
            }  
        }
    //传参
    toDetails=(e)=>{
        var target_id;
        if(e.target.tagName === "LI"){
            target_id = e.target.dataset.id;
        }else if(e.target.tagName === "P"||e.target.tagName === "IMG"){
            target_id = e.target.parentNode.dataset.id;
        }else{
            target_id = e.target.parentNode.parentNode.dataset.id;
        }
        this.props.history.push({"pathname":"/details","search":"?_id="+target_id});
    }
    render(){ 
        return (
            <div className="jym_list flexbox animate-route">
                <div className="container">
                    <header className="s_header">
                        <span className="back-btn"  onClick={this.back.bind(this)}></span>
                        <h1>绝地求生（PUBG)</h1>
                    </header>
                    <ul className="nav">
                        <li >
                            <a>
                                商品类型
                                <i></i>
                            </a>
                        </li>
                        <li>
                            <a>
                                安卓/越狱
                                <i></i>
                            </a>
                        </li>
                        <li>
                            <a>
                                服务器 <i></i>
                            </a>
                        </li>
                        <li>
                            <a>
                                筛选 
                                <i></i>
                            </a>
                        </li>
                        <li>
                            <span>
                                <i>
                                    <img onClick={this.show.bind(this)} src={require('../../img/排序.svg')} className="paixu"  alt=""/>
                                </i>
                            </span>
                        </li>
                    </ul>
                    <ul className="nav2" style={{display:'none'}} onClick={this.rank}>
                        <li>
                           默认排序 （按时间倒序）
                        </li>
                        <li className="jiang">
                            价格 ↓ （按价格从高到低）
                        </li>
                        <li className="sheng">
                             价格 ↑ （按价格从低到高）
                        </li>
                    </ul>
                    <div className="list_count" onClick={this.toDetails}>
                        <ul >
                            {
                                this.state.data.map((item) => {
                                    return <li key={item._id} data-id={item._id}>
                                                <p className="ming">{item.infos.name}</p>
                                                <img src={item.infos.img} alt=""/>
                                                <p className="server">{item.infos.account}<span> | {item.infos.server}</span></p>
                                                <p className="price">&yen;{item.infos.price}</p>
                                            </li>
                                })
                            }
                        </ul>

                    </div> 
                </div>
                <FootNav/>
            </div>
        );
    }
};

export default CmpList;