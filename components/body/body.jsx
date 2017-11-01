import React from "react";
import "./body.scss";
import {Spin} from "antd";
import {connect} from "react-redux";
import "../../public/font/iconfont.css";
import axios from 'axios'
import $ from "jquery";
import {Link} from 'react-router-dom'
window.$ = $;	

class Body extends React.Component{
	constructor(props) {
        super(props);
        this.state ={
        	arr:[{
        		name:'二手房',
        		total:"iconfont icon-fang",
        		path:"#/xhouse"
        	},{
        		name:'租房',
        		total:"iconfont icon-bieshu",
        		path:"#/xtenement"
        	},{
        		name:'出售',
        		total:"iconfont icon-chushou",
        		path:"#/entrust"
        	},{
        		name:'出租',
        		total:"iconfont icon-chuzucankao",
        		path:"#/entrust"
        	},{
        		name:'个人中心',
        		total:"iconfont icon-wo",
        		path:"#/personal"
        	}],
        	datas:[],
        	bool:true,
        	goodsid:''

        }

        this.for = ()=>{
        	return this.state.arr.map(function(item,idx){
        		return <div key={idx}>
        					<a href={item.path}>
			        			<i className={item.total}></i>
			        			<p>{item.name}</p>
		        			</a>
        				</div>
        				
        	})
        }
        
        this.setChuan = (id) => {
        	console.log(id)
        }
        
        this.obtain = (kws)=>{
        	var self = this;
        	
        	var kw;
        	
        	if(kws == '0'){
        		kw = "北京";
        	}else if(kws == 'FZ:3'){
        		kw = "金山";
        	}else if(kws == 'XM:4'){
        		kw = "海沧区";
        	};
        	var urls='http://120.76.205.241:8000/house/maitianzaixian?cityid='+kws
	+'&kw='+encodeURI(kw)+'&type=2&pageToken=1&apikey=RMw9hk7rtVbPfEkQZduqrCvuWs9PSeU7ePDQP0YKrtGQKxuG5d7uiWYeJ4t8vkPF'
			axios.get('http://localhost:23456/cina', {
				params: {
					para:urls
				}
			})
				.then(function(response) {
					console.log(response)
					var res = response.data.data
					self.setState({
					datas: res,
					bool:false
				})
			})
        	
        }
        this.forData = ()=>{
        	var self = this
        	return this.state.datas.map(function(item,idx){
        		return <li key={idx}>
        			<img src={item.imageUrls[0]}/>
        			<div>
        				<p>
        					<Link to="/datalist" onClick={self.props.ok.bind(this,item)}>
        							{item.title}
        					</Link>
        				</p>
        				<p>{Number(item.buildingArea)/10000}平<span>{Number(item.downPay)/10000}万元</span></p>
        				<p>{item.courtName}<span>{item.posterId}元/平</span></p>
        				<span>{
        					(function(res){
        						return res.tags.map(function(itm,idex){
        							return <b key={idex}>{itm}</b>
        						})
        					})(item)
        				}</span>
        			</div>
        		</li>
        	})
        }
        
    }
 
    render() {
        return (
          <div id="LY_body">
          	{/*导航*/}
           	<div className="iconssss">{this.for()}</div>
           	<div className="dianhua">
           		热线电话:<i className="iconfont icon-dianhua"></i>400-706-1188
           	</div>
           	{/*好房推荐*/}
           	<div className="goodsHouse">
           		<h5>好房推荐<span>更多></span></h5>
           		<div className={`example${this.state.bool?' showActive':''}`}>
                    <Spin tip="Loding..."/>
                </div>
           		<ul>{this.forData()}</ul>
           	</div>
           	{/*结尾*/}
           	<div className="ending">
           		<p className="end"></p>
           		<span>守望麦田 家的方向</span>
           	</div>
          </div>
        )

    }

    componentDidMount() {
  
    	var kws = this.props.city;
 
    	this.obtain(kws);
    }
    
    
    componentWillReceiveProps(NewProps){
    	var kws = NewProps.city;
 
    	this.obtain(kws);
    }

}

//导出
export default connect((state) => {
	return state
}, (dispatch) => {
	return {
		ok(news) {
			dispatch({
				type: "SETNEW",
				news: news
			})
		}
	}
})(Body);