import React from "react"
import {connect} from "react-redux";
import {Route, Link} from 'react-router-dom'
import axios from 'axios'
import "./css/house.css"
import "./css/tenement.css"
import Xheads from "./head.jsx"
import { Layout, Menu, Breadcrumb, Dropdown,Input,Select,DatePicker  } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
class Xtentment extends React.Component{
		constructor(props){
			super(props)
			this.state={
				data:[]
			}
			this.firstChildImg=(imgs)=>{
				
				console.log(imgs)
				if(!imgs){
					return
				}
				var firstImg=imgs.filter(function(item,idx){
						return idx==0
				})
				return firstImg[0]
			}
			this.typehouse=(type)=>{
				return type.map(function(item,idx){
					return <span key={idx} className={idx%2==0?"red":"green"}>{item}</span>
				})
			}
			this.citys=(event)=>{
				console.log(event)
				var kw = encodeURI(event)
				var urls='http://120.76.205.241:8000/house/maitianzaixian?cityid=0&kw='+kw+'&type=3&pageToken=1&apikey=RMw9hk7rtVbPfEkQZduqrCvuWs9PSeU7ePDQP0YKrtGQKxuG5d7uiWYeJ4t8vkPF'
				this.ajax(urls)
			}
			this.ajax=(urls)=>{
			var self = this;
			axios.get('http://localhost:23456/cina', {
				params: {
					para:urls
				}
			})
			.then(function(response) {
				console.log(response)
				var res = response.data.data
				self.setState({
					data: res
				})
				console.log(self.state.data)
			})
		}
			this.listInits=()=>{
				var self=this
				console.log(this.state.data)
				var data=this.state.data		
				var list;
				list=data.map(function(item,idx){
					return  <li key={idx} className="clearfix conten" >
								<div className="pri fl">
                                    <Link target="_blank"  to="/xrentlist">
                                    </Link>
                                    <div className="hide_border">
                                        <Link to="/xrentlist" >
                                            <label>
                                          
                                                	图
                                            </label>
                                        </Link>
                                    </div>
                                </div>
                                <div className="list_title fl">
                                    <h1>
                                        <Link to="/xrentlist" onClick={()=>{self.props.ok(item)}}>{item.title}</Link>
                                    </h1>
                                   	<p className="clearfix tenem">
                                   		<span className="builtupArea">{item.flatOptions[0].builtupArea}平</span>
                                   		<span className="type">{item.flatOptions[0].type}</span>
                                        <span className="courtName">{item.courtName}</span>                                
                                   	</p>
                                   	<p className="price"><span>{item.price}</span>元/月</p>
                                    <p className="leixin">{self.typehouse(item.tags)}</p>
                                </div>
                            </li>
				})
				return list
			}
			  
		}
		componentWillMount(){
			var self = this;
			var urlss='http://120.76.205.241:8000/house/maitianzaixian?cityid=0&kw=%E7%9F%B3%E6%99%AF%E5%B1%B1&type=3&pageToken=1&apikey=RMw9hk7rtVbPfEkQZduqrCvuWs9PSeU7ePDQP0YKrtGQKxuG5d7uiWYeJ4t8vkPF'
				axios.get('http://localhost:23456/cina',
			    	{ params: {
	      					para:urlss
	    				}
			    	})
				.then(function (response) {
					console.log(response)
					var res=response.data.data
					self.setState({data:res})
				  })
				  .catch(function (error) {
				    console.log(error);
				  })

		}
		render(){
			return(
				<div >
					<Xheads />
					<div className="nav">
						<InputGroup compact>
					      <Select key="1" defaultValue="北京" onChange={this.citys}>
					        <Option value="东直门">东直门</Option>
					        <Option value="石景山">石景山</Option>
					        <Option value="朝阳">朝阳</Option>
					        <Option value="昌平">昌平</Option>
					        <Option value="大兴">大兴</Option>
					        <Option value="丰台">丰台</Option>
					        <Option value="海淀">海淀</Option>
					        <Option value="东城">东城</Option>
					      </Select>
					      <Select key="2" defaultValue="租金">
					        <Option value="2000以下">2000以下</Option>
					        <Option value="2000-3000元">2000-3000元</Option>
					        <Option value="3000-4000元">3000-4000元</Option>
					        <Option value="4000-5000元">4000-5000元</Option>
					        <Option value="5000-6000元">5000-6000元</Option>
					        <Option value="6000以上">6000以上</Option>
					      </Select>
					      <Select  key="3" defaultValue="户型">
					        <Option value="一室">一室</Option>
					        <Option value="二室">二室</Option>
					        <Option value="三室">三室</Option>
					        <Option value="四室">四室</Option>
					        <Option value="五室">五室</Option>
					        <Option value="六室">六室</Option>
					        <Option value="六室以上">六室以上</Option>
					      </Select>
					      <Select key="4" defaultValue="其他">
					        <Option value="地铁房">地铁房</Option>
					        <Option value="首次出租">首次出租</Option>
					        <Option value="有电梯">有电梯</Option>
					        <Option value="随时看房">随时看房</Option>
					        <Option value="带露台">带露台</Option>
					        <Option value="带车位">带车位</Option>
					        <Option value="带飘窗">带飘窗</Option>
					      </Select>
					    </InputGroup>
					</div>
					<div>{this.state.data && this.state.data.map((item,idx)=>{
						return  <li key={idx} className="clearfix conten" >
								<div className="pri fl">
                                    <Link target="_blank"  to="/xrentlist">
                                    	<img src={this.firstChildImg(item.imageUrls)}  className="mCS_img_loaded" />
                                    </Link>
                                    <div className="hide_border">
                                        <Link to="/xrentlist" >
                                            <label>
                                          
                                                	图
                                            </label>
                                        </Link>
                                    </div>
                                </div>
                                <div className="list_title fl">
                                    <h1>
                                        <Link to="/xrentlist" onClick={()=>{this.props.ok(item)}}>{item.title}</Link>
                                    </h1>
                                   	<p className="clearfix tenem">
                                   		<span className="builtupArea">{item.flatOptions[0].builtupArea}平</span>
                                   		<span className="type">{item.flatOptions[0].type}</span>
                                        <span className="courtName">{item.courtName}</span>                                
                                   	</p>
                                   	<p className="price"><span>{item.price}</span>元/月</p>
                                    <p className="leixin">{this.typehouse(item.tags)}</p>
                                </div>
                            </li>
						})
					
					}</div>
				</div>
			)
		}

}
export default connect((state) => {
	console.log(state)
	return state
}, (dispatch) => {
	return {
		ok(news) {
			dispatch({
				type: "SETRENT",
				newt: news
			})
		}
	}
})(Xtentment)