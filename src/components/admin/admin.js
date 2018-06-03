import "../../css/cmp_admin.css";

import React, { Component } from "react";

import Requests from "../../util/httpclient.js";

class CmpAdmin extends Component {
    state = {
        "cmp":""
    }
    componentDidMount(){
        this.setState({
            "cmp":<CmpLogin cmpChange={this.cmpChanges}/>
        });
    }
    cmpChanges = () => {
        this.setState({
            "cmp":<CmpDB cmpChange={this.cmpChanges}/>
        });
    }
    render(){
        return (
            <div className="cmp_admin">
                {this.state.cmp}
            </div>
        );
    }
}

class CmpLogin extends Component {
    state = {
        "adminName":"",
        "adminPsw":""
    }
    componentDidMount(){
        window.addEventListener('keydown', this.keyLogin);
    }
    changeValue = (e) => {
        let t = e.target;
        let cmp = this;
        if(t.classList.contains("adminName")){
            cmp.setState({"adminName":t.value});
        }else if(t.classList.contains("adminPsw")){
            cmp.setState({"adminPsw":t.value});
        }
    }
    clickLogin = () => {
        let cmp = this;
        // 只做测试用
        if(cmp.state.adminName === "admin" && cmp.state.adminPsw === "huxinguo"){
            cmp.props.cmpChange();
        }else{
            alert("不要随便操作");
        }
    }
    keyLogin = (e) => {
        e.stopPropagation();
        if(e.keyCode === 13){
            this.clickLogin();
        }
    }
    render(){
        return (
            <div className={"adminLogin "+this.props.classLogin} onKeyDown={this.keyLogin}>
                <p>后台管理系统</p>
                <input className="adminName btntxt" type="text" value={this.state.adminName} onChange={this.changeValue} placeholder="帐号"/>
                <input className="adminPsw btntxt" type="password" value={this.state.adminPsw} onChange={this.changeValue} placeholder="密码"/>
                <input className="btnin" type="button" value="登录" onClick={this.clickLogin}/>
            </div>
        );
    }
}

class CmpDB extends Component {
    state = {
        "showTitle":<thead></thead>,
        "showDoc":<tbody></tbody>
    }
    actDBTitle = (data) => {
        this.setState({"showTitle":data});
    }
    actDBDoc = (data) => {
        this.setState({"showDoc":data});
    }
    actList = (e) => {
        let cmp = this;
        let t = e.target;
        if(t.tagName === "LI"){
            if(t.dataset.showlist === "show"){
                for(let n = 0;n < t.parentNode.children.length;n++){
                    t.parentNode.children[n].className = "";
                    t.parentNode.children[n].dataset.showlist = "hide";
                };
                cmp.setState({
                    "showTitle":<thead></thead>,
                    "showDoc":<tbody></tbody>
                });
            }else{
                for(let n = 0;n < t.parentNode.children.length;n++){
                    t.parentNode.children[n].className = "";
                    t.parentNode.children[n].dataset.showlist = "hide";
                };
                t.className = "DBlistAct";
                t.dataset.showlist = "show";

                Requests.ajax({
                    "method":"GET",
                    "url":"/admin/getcol?col=" + t.innerText.toLowerCase()
                }).then((res)=>{
                    if(t.innerText === "Products"){
                        cmp.setState({
                            "showDoc":<DocProducts arrData={res.body.data} cmpDad={cmp}/>
                        });
                    }else if(t.innerText === "Users"){
                        cmp.setState({
                            "showDoc":<DocUsers arrData={res.body.data} cmpDad={cmp}/>
                        });
                    }
                });
            }
        }
    }
    render(){
        return (
            <div className={"adminDB "+this.props.classDB}>
                <ul className="DBNav"></ul>
                <ul className="DBList" onClick={this.actList}>
                    <li>Products</li>
                    <li>Users</li>
                </ul>
                <div className="DBData">
                    <div className="DBTitle">
                        <table>{this.state.showTitle}</table>
                    </div>
                    <div className="DBDoc">
                        <table>{this.state.showDoc}</table>
                    </div>
                    <div className="DBpage">
                        <ul></ul>
                    </div>
                </div>
            </div>
        );
    }
}

class DocProducts extends Component {
    componentWillMount(){
        let cmp = this;
        cmp.props.cmpDad.actDBTitle((
            <thead>
                <tr>
                    <th>商品 ID</th>
                    <th>商品名称</th>
                    <th>游戏名称</th>
                    <th>修改</th>
                </tr>
            </thead>
        ));
    }
    writeDoc = (e) => {
        let cmp = this;
        let t = e.target;
        if(t.value === "新增"){
            cmChangeDoc({
                "change":"insert",
                "type":"products",
                "cmp":cmp,
                "cmpDad":cmp.props.cmpDad,
                "data":{
                    "letter":"string（大写首字母）",
                    "keyword":"string（关键字:用,隔开）",
                    "gameName":"string（游戏名称）",
                    "sell":{"stars":"number（卖家星数）","identMan":"boolean（实人认证）","identName":"boolean（实名认证）","guarantee":"boolean（商品认证）","sellRate":"number（近7天成交率）"},
                    "infos":{"type":"string（商品类型）","name":"string（商品名称）","img":"array（图片路径）","price":"number（现价）","cost":"number（原价）","sellCount":"number（销售量）","account":"string（帐号平台）","server":"string（服务器平台）","OS":"string（操作系统）","tempNum":0},
                    "detail":{"所属游戏":"游戏名称","商品类型":"帐号类型","客户端":"客户端平台","服务器":"服务器平台","性别":"男","帐号绑定":"密保邮箱"}
                }
            });
        }else if(t.value === "修改"){
            Requests.ajax({
                "method":"GET",
                "url":"/admin/getdoc?_id=" + t.parentNode.parentNode.dataset.uid + "&type=products"
            }).then((res)=>{
                cmChangeDoc({
                    "change":"updata",
                    "type":"products",
                    "cmp":cmp,
                    "cmpDad":cmp.props.cmpDad,
                    "data":res.body.data[0]
                });
            });
        }else if(t.value === "删除"){
            cmConfirmBox({
                "txt":"确定要删除吗？删除后无法还原",
                "fn":(function(cb){
                    Requests.ajax({
                        "method":"GET",
                        "url":"/admin/deletedoc?_id=" + t.parentNode.parentNode.dataset.uid + "&type=products"
                    }).then((res)=>{
                        cmChangeDoc({
                            "change":"delete",
                            "type":"products",
                            "cmp":cmp,
                            "cmpDad":cmp.props.cmpDad,
                            "data":res.body.data,
                            "cb":cb
                        });
                    });
                })
            });
        };
    }
    actDoc = (arr) => {
        let cmp = this;
        if(arr.length === 0){
            return (<tr><td>数据为空</td></tr>);
        }else{
            let newarr = arr.reverse();
            return newarr.map((k)=>{
                return (
                    <tr key={k._id} data-uid={k._id}>
                        <td><input className="DBDocTxt" type="text" value={k._id} disabled/></td>
                        <td><input className="DBDocTxt" type="text" value={k.infos.name} disabled/></td>
                        <td><input className="DBDocTxt" type="text" value={k.gameName} disabled/></td>
                        <td onClick={cmp.writeDoc}>
                            <input className="DBDocBtn" type="button" value="新增"/>
                            <input className="DBDocBtn" type="button" value="修改"/>
                            <input className="DBDocBtn" type="button" value="删除"/>
                        </td>
                    </tr>
                );
            });
        }
    }
    render(){
        return (<tbody>{this.actDoc(this.props.arrData)}</tbody>);
    }
}

class DocUsers extends Component {
    componentWillMount(){
        let cmp = this;
        cmp.props.cmpDad.actDBTitle((
            <thead>
                <tr>
                    <th>用户 ID</th>
                    <th>用户帐号</th>
                    <th>修改</th>
                </tr>
            </thead>
        ));
    }
    writeDoc = (e) => {
        let cmp = this;
        let t = e.target;
        if(t.value === "新增"){
            cmChangeDoc({
                "change":"insert",
                "type":"users",
                "cmp":cmp,
                "cmpDad":cmp.props.cmpDad,
                "data":{
                    "tradeCount":"number（成交次数）",
                    "tradeList":"arr（交易记录）",
                    "uphone":"string（绑定手机）",
                    "uQQ":"string（绑定QQ）",
                    "uname":"string（用户名,还没做好新增用户数据的功能,所以不能改）",
                    "upsw":"string（密码,还没做好新增用户数据的功能,所以不能改）"
                }
            });
        }else if(t.value === "修改"){
            Requests.ajax({
                "method":"GET",
                "url":"/admin/getdoc?_id=" + t.parentNode.parentNode.dataset.uid + "&type=users"
            }).then((res)=>{
                cmChangeDoc({
                    "change":"updata",
                    "type":"users",
                    "cmp":cmp,
                    "cmpDad":cmp.props.cmpDad,
                    "data":res.body.data[0]
                });
            });
        }else if(t.value === "删除"){
            cmConfirmBox({
                "txt":"确定要删除吗？删除后无法还原",
                "fn":(function(cb){
                    Requests.ajax({
                        "method":"GET",
                        "url":"/admin/deletedoc?_id=" + t.parentNode.parentNode.dataset.uid + "&type=users"
                    }).then((res)=>{
                        cmChangeDoc({
                            "change":"delete",
                            "type":"users",
                            "cmp":cmp,
                            "cmpDad":cmp.props.cmpDad,
                            "data":res.body.data,
                            "cb":cb
                        });
                    });
                })
            });
        };
    }
    actDoc = (arr) => {
        let cmp = this;
        if(arr.length === 0){
            return (<tr><td>数据为空</td></tr>);
        }else{
            let newarr = arr.reverse();
            return newarr.map((k)=>{
                return (
                    <tr key={k._id} data-uid={k._id}>
                        <td><input className="DBDocTxt" type="text" value={k._id} disabled/></td>
                        <td><input className="DBDocTxt" type="text" value={k.uname} disabled/></td>
                        <td onClick={cmp.writeDoc}>
                            <input className="DBDocBtn" type="button" value="新增"/>
                            <input className="DBDocBtn" type="button" value="修改"/>
                            <input className="DBDocBtn" type="button" value="删除"/>
                        </td>
                    </tr>
                );
            });
        }
    }
    render(){
        return (<tbody>{this.actDoc(this.props.arrData)}</tbody>);
    }
}

function cmChangeDoc(opt){
    // {
    //     "change":"insert",
    //     "type":"products",
    //     "cmp":cmp,
    //     "cmpDad":cmp.props.cmpDad,
    //     "data"
    //     "cb"
    // }
    if(opt.change === "delete"){
        opt.cmp.actDoc(opt.data);
        if(opt.type === "products"){
            opt.cmpDad.actDBDoc(<DocProducts arrData={opt.data.reverse()} cmpDad={opt.cmpDad}/>)
        }else if(opt.type === "users"){
            opt.cmpDad.actDBDoc(<DocUsers arrData={opt.data.reverse()} cmpDad={opt.cmpDad}/>)
        }
        alert("删除成功");
        opt.cb();
    }else{
        var mask = document.createElement("div");
        mask.className = "docMask";

        mask.innerHTML = `
            <div class="docBox">
                <p class="docBoxWarn">数据输入格式<span style="color:#b00;">必须</span>严格遵循说明文档</p>
                <ul class="docBoxUl">${
                    (function(){
                        var li = "";
                        for(var k in opt.data){
                            if(k === "_id"){
                                li += `<li>
                                    <span class="docBoxLiKey">${k}</span>
                                    <span class="docBoxLiVal getOid" style="border:0 none;cursor:default;">${JSON.stringify(opt.data[k])}</span>
                                </li>`;
                            }else if(k === "uname" || k === "upsw"){
                                li += `<li>
                                    <span class="docBoxLiKey">${k}</span>
                                    <span class="docBoxLiVal getDatas" style="border:0 none;cursor:default;" data-keyname=${k}>${JSON.stringify(opt.data[k])}</span>
                                </li>`;
                            }else{
                                li += `<li>
                                    <span class="docBoxLiKey">${k}</span>
                                    <span class="docBoxLiVal getDatas" contenteditable="true" data-keyname=${k}>${JSON.stringify(opt.data[k])}</span>
                                </li>`;

                            }
                        };
                        return li;
                    })()
                }</ul>
                <p class="docBoxP">
                    <span class="docBoxOK">保存</span>
                    <span class="docBoxNO">取消</span>
                </p>
            </div>
        `;

        var cmp_admin = document.querySelector(".cmp_admin");
        cmp_admin.appendChild(mask);

        mask.onclick = function(e){
            var t = e.target;
            if(t.classList.contains("docBoxOK")){
                var nodes = document.querySelectorAll(".getDatas");
                var obj = {};
                new Promise(function (resolve,reject){
                    for(var n = 0;n < nodes.length;n++){
                        obj[nodes[n].dataset.keyname] = JSON.parse(nodes[n].innerText);
                    }
                    resolve();
                }).then(function (res){
                    if(opt.change === "updata"){
                        var oid = document.querySelector(".getOid").innerText;
                        Requests.ajax({
                            "method":"POST",
                            "url":"/admin/updatedoc?_id=" + oid + "&type=" + opt.type,
                            "set":{"Content-Type":"application/x-www-form-urlencoded"},
                            "send":{"datas":JSON.stringify(obj)}
                        }).then((res)=>{
                            opt.cmp.actDoc(res.body.data);
                            if(opt.type === "products"){
                                opt.cmpDad.actDBDoc(<DocProducts arrData={res.body.data.reverse()} cmpDad={opt.cmpDad}/>)
                            }else if(opt.type === "users"){
                                opt.cmpDad.actDBDoc(<DocUsers arrData={res.body.data.reverse()} cmpDad={opt.cmpDad}/>)
                            }
                            alert("修改成功");
                            cmp_admin.removeChild(mask);
                        }).catch((err)=>{
                            alert("修改失败");
                        });
                    }else if(opt.change === "insert"){
                        Requests.ajax({
                            "method":"POST",
                            "url":"/admin/insertdoc?type=" + opt.type,
                            "set":{"Content-Type":"application/x-www-form-urlencoded"},
                            "send":{"datas":JSON.stringify(obj)}
                        }).then((res)=>{
                            opt.cmp.actDoc(res.body.data);
                            if(opt.type === "products"){
                                opt.cmpDad.actDBDoc(<DocProducts arrData={res.body.data.reverse()} cmpDad={opt.cmpDad}/>)
                            }else if(opt.type === "users"){
                                opt.cmpDad.actDBDoc(<DocUsers arrData={res.body.data.reverse()} cmpDad={opt.cmpDad}/>)
                            }
                            alert("新增成功");
                            cmp_admin.removeChild(mask);
                        }).catch((err)=>{
                            alert("新增失败");
                        });
                    };
                }).catch(function (err){
                    alert("数据格式有误");
                });
            }else if(t.classList.contains("docBoxNO")){
                cmp_admin.removeChild(mask);
            }
        }
    }
}

function cmConfirmBox(opt){
    // {
    //     "txt",
    //     "fn"
    // }
    var mask = document.createElement("div");
    mask.className = "docMask";

    mask.innerHTML = `
        <div class="docBox" style="height:250px;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);">
            <ul class="docBoxUl">
                <li style="position:relative;top:50%;transform:translateY(-50%);text-align:center;font-size:24px;color:#b00;">${opt.txt}</li>
            </ul>
            <p class="docBoxP">
                <span class="docBoxOK" style="background:#e00;">确定</span>
                <span class="docBoxNO" style="background:#00e;">取消</span>
            </p>
        </div>
    `;

    var cmp_admin = document.querySelector(".cmp_admin");
    cmp_admin.appendChild(mask);

    mask.onclick = function(e){
        var t = e.target;
        if(t.classList.contains("docBoxOK")){
            // opt.fn(cb())
            opt.fn((function(){
                cmp_admin.removeChild(mask)
            }));
        }else if(t.classList.contains("docBoxNO")){
            cmp_admin.removeChild(mask);
        }
    }
}

export default CmpAdmin;