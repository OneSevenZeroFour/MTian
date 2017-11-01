import React from "react"
import {connect} from "react-redux";
import {Route, Link} from 'react-router-dom'
import axios from 'axios'
import {Button,Radio,Icon,Carousel} from 'antd';
import store from "../store.js";
import 'antd/dist/antd.css'
import "./css/datalist.css"
class Xrentlist extends React.Component{
		constructor(props){
			super(props)
			this.state={
				name:"出租详情"
			}
			this.Carous=(img)=>{
				return img.map((item,idx)=>{
					return <img src={item} key={idx}/>
				})
			}
			
			this.back=()=>{
				window.history.go(-1)
			}
			
			this.setmsg=(event)=>{
				console.log(event.target)
						
				var self = this
				$(event.target).hide()
				$(self.refs.guanzhu).show()
				
				var news = this.props.newt
				console.log(news.tradeType)
				console.log(news.tags)
				var tags = news.tags
				if(news.tradeType == 3){
					$.ajax({
						url: 'http://localhost:23456/guanzhu',
						type: 'post',
						data: {
							id: news.id,
							username: 18578650260,
							img: news.imageUrls[0],
							tags: tags,
							downPay: news.price,
							address: news.address,
							title: news.title,
							monthPay: news.mortgageInfo
,
							type: news.tradeType
						},
						success: function() {
							console.log(event.target)
							console.log(self.refs.guanzhu)
					
						}
					})
				}else{
					$.ajax({
						url: 'http://localhost:23456/guanzhu',
						type: 'post',
						data: {
							id: news.id,
							username: 18578650260,
							img: news.imageUrls[0],
							tags: tags,
							downPay: news.downPay,
							address: news.address,
							title: news.title,
							monthPay: news.monthPay,
							type: news.tradeType
						},
						success: function() {
							console.log(event.target)
							console.log(self.refs.guanzhu)
					
						}
					})
				}
				
				
			}

			this.typehouses = (type) => {
				return type.map(function(item, idx) {
					return <span key={idx} className={idx%2==0?"red":"green"}>{item}</span>
				})
			}
			
			this.content=()=>{
			return <div>
						<div className="tupian">
							<Carousel autoplay>
								{this.Carous(this.props.newt.imageUrls)}
							</Carousel>
						</div>
						<p className="title">{this.props.newt.title}</p>
						<p className="jiage">
						{this.props.newt.price}<span>元/月</span>
						<span className = "guanzhu" onClick={this.setmsg} ref="guanzhu2">关注</span>
						<span className = "guanzhu2" ref="guanzhu">已关注</span>
						</p>
						<p className="types">{this.typehouses(this.props.newt.tags)}</p>
						<p className="moth"><span>小区:</span>{this.props.newt.courtName}<span></span> <span>方式:</span><span>整租</span></p>
						<p className="area"><span>建筑面积:</span><span>{this.props.newt.flatOptions[0].builtupArea}</span><span>装修：</span>
<span>{this.props.newt.flatOptions[0].decoration}</span></p>
						<p className="fangxiang"><span>朝向:</span><span>{this.props.newt.flatOptions[0].orientation}</span><span>楼层:</span><span>{this.props.newt.flatOptions[0].floor}</span></p>
						<div className="miaoshu">
							<h3>房源描述</h3>
							<p>
								<span>【房源描述】</span>
								{this.props.newt.description}
							</p>
						</div>
						<div className="news">
							<h3>房间信息</h3>
							<p>
								<span>房间物品 </span><span>{this.props.newt.facilities}</span>
							</p>
							<p><span>地铁线:</span><span>{this.props.newt.metroInfo}</span></p>
							<p><span>容积率: </span><span>{this.props.newt.floorAreaRatio}</span><span>绿化率</span><span>{this.props.newt.greeningRatio*100}%</span></p>
						</div>
						<div className="address">
							<h3>小区地理位置</h3>
							<p>{this.props.newt.address}</p>
						</div>
					</div>
		
			}
		}
		
		render(){
			return <div className="de">
						<div className="header">
							<Icon type="left" onClick={this.back}/>
							<span>房源信息</span>
						</div>
						<div className="content">
							{this.content()}
						</div>
						<div className="footer">
							
						</div>
					</div>
		}
}
export default connect((state) => {
  console.log(state)
  return state
})(Xrentlist)