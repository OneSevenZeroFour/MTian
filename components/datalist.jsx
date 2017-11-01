import React from "react"
import {connect} from "react-redux";
import {Route, Link} from 'react-router-dom'
import axios from 'axios'
import {Button,Radio,Icon,Carousel} from 'antd';
import store from "../store.js";
import 'antd/dist/antd.css'
import "./css/datalist.css"
class Xdatalist extends React.Component{
		constructor(props){
			super(props)
			this.state={
				name:"详情"
			}
			this.imgs=(img)=>{
				return img.map((item,idx)=>{
					return <img src={item} key={idx}/>
				})
			}
			this.typehouses = (type) => {
				return type.map(function(item, idx) {
					return <span key={idx} className={idx%2==0?"red":"green"}>{item}</span>
				})
			}
			
			this.setmsg=(event)=>{
				console.log(event.target)
						
				var self = this
				$(event.target).hide()
				$(self.refs.guanzhu).show()
				console.log(self.refs.guanzhu)
				var news = this.props.news
				var tags = JSON.stringify(news.tags)
				console.log(JSON.stringify(news.tags))
				console.log(this.props.news)
				$.ajax({
					url:'http://localhost:23456/guanzhu',
					type:'post',
					data:{id:news.id,username:18578650260,img:news.imageUrls[0],tags:tags,downPay:news.downPay,address:news.address,title:news.title,monthPay:news.monthPay,type:news.tradeType
},
					success:function(){
						console.log(event.target)
						console.log(self.refs.guanzhu)
						
					}
				})
				
			}
			
			this.chushi =()=>{
				var self = this
				var news = this.props.news
				$.ajax({
					url:'http://localhost:23456/chushi',
					type:'post',
					data:{id:news.id},
					success:function(data){
						
						console.log(data)
						if(data.length!==0){
							$(self.refs.guanzhu2).hide()
							$(self.refs.guanzhu).show()
						}
					}
				})
			}
			
			this.back=()=>{
				window.history.go(-1);
			}
			
			this.content=()=>{
			return <div>
						<div className="tupian">
							<Carousel autoplay>
							{this.imgs(this.props.news.imageUrls)}
							</Carousel>
						</div>
						<p className="title">{this.props.news.title}</p>
						<p className="jiage">
							{this.props.news.downPay*0.0001}万元
							<span>{parseInt(this.props.news.downPay/this.props.news.landArea*0.1)}万元/平</span>
							<span className = "guanzhu" onClick={this.setmsg} ref="guanzhu2">关注</span>
							<span className = "guanzhu2" ref="guanzhu">已关注</span>
						</p>
						<p className="types">{this.typehouses(this.props.news.tags)}</p>
						<p className="moth"><span>月供:</span><span>{this.props.news.monthPay
}元</span> <span>首付:</span><span>{this.props.news.downPay*0.00004}万元</span></p>
						<p className="area">建筑面积:<span>{this.props.news.landArea*0.001}</span></p>
						<div className="miaoshu">
							<h3>房源描述</h3>
							<p>
								<span>【房源描述】</span>
								{this.props.news.description}
							</p>
						</div>
						<div className="news">
							<h3>小区信息</h3>
							<p>
								<span>小区名称: </span><span>{this.props.news.courtName}</span>
							</p>
							<p><span>小区入住户数:</span><span>{this.props.news.flatCount}户</span></p>
							<p><span>容积率: </span><span>{this.props.news.floorAreaRatio}</span><span>绿化率</span><span>{this.props.news.greeningRatio*100}%</span></p>
						</div>
						<div className="address">
							<h3>小区地理位置</h3>
							<p>{this.props.news.address}</p>
						</div>
					</div>
		
			}
		}
		
		
		componentDidMount(){
			this.chushi()
		}
		
		
		render(){
			return <div className="de">
						<div className="header">
							<Icon type="left"  onClick={this.back}/>
							<span>房源信息</span>
						</div>
						<div className="content">
							{this.content()}
						</div>
						<div className="footer clearfix">
							<div className="fl tu">
								<img src="../js/13.png" />
							</div>
							<div className="fl xinx">
								<p className="name">{this.props.news.posterScreenName}</p>
								<p className="tel">{this.props.news.salePhones[0]}</p>
							</div>
						</div>
					</div>
		}
}
export default connect((state) => {
  console.log(state)
  return state
})(Xdatalist)