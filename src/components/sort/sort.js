import '../../css/cmp_sort.css';

import React, { Component } from 'react';

import Requests from '../../util/httpclient.js';
import FootNav from '../main/footnav.js';
import $ from 'jquery'

class CmpSort extends Component{
    // "method":"POST",
        // "url":"/sort/letter",
        // "set":{"Content-Type":"application/x-www-form-urlencoded"},
        // "send":{"letter":"A"}
        // 
        // "method":"POST",
        // "url":"/sort/keyword",
        // "set":{"Content-Type":"application/x-www-form-urlencoded"},
        // "send":{"keyword":"阿"}
        // 
        // "method":"POST",
        // "url":"/sort/gameName",
        // "set":{"Content-Type":"application/x-www-form-urlencoded"},
        // "send":{"gameName":"女王之刃"}
        // 
        // "method":"GET",
        // "url":"/sort/hot"
     

     state = {
        data: []
    }
    componentDidMount(){
        //点击高亮显示
        $(function(){ 
            $(".aa").click(function(){
                $(this).addClass("active").siblings().removeClass("active"); 
            }); 
        }); 
        
        let cmp = this;
        if(cmp.props.location.state){
            if(cmp.props.location.state.letter){
                if(cmp.props.location.state.letter === '热'){
                    Requests.ajax({
                        "method":"GET",
                        "url":"/sort/hot",
                        }).then((res) => {
                            cmp.setState({
                                data: res.body.data
                        })
                    })
                }else{
                    Requests.ajax({
                        "method":"POST",
                        "url":"/sort/letter",
                        "set":{"Content-Type":"application/x-www-form-urlencoded"},
                        "send":{"letter":cmp.props.location.state.letter}
                    }).then((res) => {
                        if(res.body.msg === "founded"){
                            cmp.setState({
                                data: res.body.data
                            })
                        }else{
                            cmp.setState({
                                data: []
                            })
                        }
                    })
                }
                $(function(){ 
                    $(".aa").map((i,k)=>{
                        if(k.innerText === cmp.props.location.state.letter){
                            $(k).addClass("active").siblings().removeClass("active");
                        }
                        return false;
                    });
                }); 
            }else if(cmp.props.location.state.keyword){
                Requests.ajax({
                    "method":"POST",
                    "url":"/sort/keyword",
                    "set":{"Content-Type":"application/x-www-form-urlencoded"},
                    "send":{"keyword": cmp.props.location.state.keyword}
                }).then((res) => {
                    cmp.setState({
                        data: res.body.data
                    })
                    $(function(){ 
                        $(".aa").map((i,k)=>{
                            $(k).removeClass("active");
                            return false;
                        });
                    }); 
                })
            } 
        }else{
            Requests.ajax({
                "method":"GET",
                "url":"/sort/hot"
            }).then((res) => {
                cmp.setState({data: res.body.data});
                $(function(){ 
                    $(".aa").map((i,k)=>{
                        if(k.innerText === "热"){
                            $(k).addClass("active").siblings().removeClass("active"); 
                        }
                        return false;
                    });
                });
            })
        }
    }
    getRe = () => {
        
            Requests.ajax({
                "method":"GET",
                "url":"/sort/hot"
            }).then((res) => {
                this.setState({
                    data: res.body.data
                })
            })
            
    }
   
    getcount(e){
        if(e.target.tagName === "LI"){
            if(e.target.innerText === '热'){
                
                Requests.ajax({
                    "method":"GET",
                    "url":"/sort/hot",
                    }).then((res) => {
                        this.setState({
                            data: res.body.data
                    })
                })
            }else{
                Requests.ajax({
                    "method":"POST",
                    "url":"/sort/letter",
                    "set":{"Content-Type":"application/x-www-form-urlencoded"},
                    "send":{"letter":e.target.innerText}
                }).then((res) => {
                    if(res.body.msg === "founded"){
                        this.setState({

                            data: res.body.data
                        })
                    }else{
                        this.setState({
                            data: []

                        })
                    }
                })
            }   
        }
    }

    change = (e) => {
         Requests.ajax({
            "method":"POST",
            "url":"/sort/keyword",
            "set":{"Content-Type":"application/x-www-form-urlencoded"},
            "send":{"keyword": e.target.value}
        }).then((res) => {
            this.setState({
                data: res.body.data
            })
            $(function(){ 
                $(".aa").map((i,k)=>{
                    $(k).removeClass("active");
                    return false;
                });
            }); 
        })
    }
    //点击跳转
    tiaozhuan(){
        // console.log(this);
        this.props.history.push({"pathname":"/list","search":"?name=绝地求生（PUBG)"})
      }
    //返回
    back(){
        this.props.history.goBack()
    }
    render(){
        return (
            <div className="jym_sort flexbox animate-route">
                <div className="container">
                    <header className="s_header">
                        <span className="back-btn"  onClick={this.back.bind(this)}></span>
                        <h1>搜索结果</h1>
                    </header>
                    <div className="form-con">
                        <div className="search-input">
                            <input type="text" placeholder="请输入游戏/店铺" name="keyWord" id="keyWord" value={this.state.text} onChange={this.change}/>
                        </div>
                        <input className="btn-default" type="submit" value="快搜" id="seachBtn" />
                    </div>
                    <div className="s_main">
                        <div className="main_t">
                            <p className="propmt-info">请选择商品所属游戏的首个字母，快速检索
                            </p>
                        </div>
                        <ul className="select-letter" onClick={this.getcount.bind(this)}> 
                            <li className="aa" onClick={this.getRe}>热</li>
                            <li className="aa">A</li>
                            <li className="aa">B</li>
                            <li className="aa">C</li>
                            <li className="aa">D</li>
                            <li className="aa">E</li>
                            <li className="aa">F</li>
                            <li className="aa">G</li>
                            <li className="aa">H</li>
                            <li className="aa">I</li>
                            <li className="aa">J</li>
                            <li className="aa">K</li>
                            <li className="aa">L</li>
                            <li className="aa">M</li>
                            <li className="aa">N</li>
                            <li className="aa">O</li>
                            <li className="aa">P</li>
                            <li className="aa">Q</li>
                            <li className="aa">R</li>
                            <li className="aa">S</li>
                            <li className="aa">T</li>
                            <li className="aa">U</li>
                            <li className="aa">V</li>
                            <li className="aa">W</li>
                            <li className="aa">X</li>
                            <li className="aa">Y</li>
                            <li className="aa">Z</li>
                        </ul>
                        <div className="s_count">
                            
                            <ul onClick={this.tiaozhuan.bind(this)}>
                                {
                                    this.state.data.map((item) => {
                                        return <li key={item._id}>
                                                    <p>{item.gameName}</p>
                                                </li>
                                    })
                                }
                            </ul>
                        </div> 
                    </div>
                </div>
                <FootNav/>
            </div>
        );
    }
};
export default CmpSort;