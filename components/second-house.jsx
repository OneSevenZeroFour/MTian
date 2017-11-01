import React from "react"
import axios from 'axios'
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom'
import { Button, Radio, Icon, Spin} from 'antd';
import { Layout, Menu, Breadcrumb, Dropdown,Input,Select,DatePicker  } from 'antd';
import store from "../store.js";
import 	Xheads from "./head.jsx"
import "./css/house.css"
import 'antd/dist/antd.css'
const InputGroup = Input.Group;
const Option = Select.Option;
class Xhouse extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			defaultCity: "",
			price: [],
			bool:true,
			city:{
				BJ:["东直门","石景山","朝阳","昌平","大兴","海淀","东城","顺义","通州","西城"],
				FZ:["鼓楼","台江","晋安","金山","苍山","马尾","闽侯"],
				XM:["海沧区","思明区","湖里区"]
			}
		}
		this.firstChildImg = (imgs) => {
			var firstImg = imgs.filter(function(item, idx) {
				return idx == 0
			})
			return firstImg[0]
		}
		this.typehouse = (type) => {
			return type.map(function(item, idx) {
				return <span key={idx} className={idx%2==0?"red":"green"}>{item}</span>
			})
		}
		this.onChange=(event)=>{
			this.setState({
				bool:true
			})
			var ci=this.props.city
		
			var kw = encodeURI(event)
			var urls='http://120.76.205.241:8000/house/maitianzaixian?cityid='+ci+'&kw='+kw+'&type=2&pageToken=1&apikey=RMw9hk7rtVbPfEkQZduqrCvuWs9PSeU7ePDQP0YKrtGQKxuG5d7uiWYeJ4t8vkPF'
			this.ajax(urls)
		}
		this.citytype=()=>{
			var defaultCity=this.state.defaultCity;
			
		
			var citys=[];
				if(defaultCity=="北京"){
					citys=this.state.city.BJ
				}else if(defaultCity=="金山"){
					citys=this.state.city.FZ
				}else if(defaultCity=="海沧区"){
					citys=this.state.city.XM
				}
			var res=citys.map(function(item,idx){
				return <Option value={item} key={idx}>{item}</Option>
			})
		return res
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
					data: res,
					bool:false
				})
				console.log(self.state.data)
			})
			 .catch(function(err){
		        console.log(err);
		    })
		}	
	}
	componentWillMount() {
		var self=this
		var cityid=this.props.city
		var kws="";
		if(cityid==0){
			kws = "北京"
		}
		else if (cityid=="FZ:3"){
			kws = "金山"
		}else if(cityid=="XM:4"){
			kws = "海沧区"
		}
		self.setState({
			defaultCity: kws
		})
		console.log(self.state.defaultCity)
		var kw = encodeURI(kws)
		var urls='http://120.76.205.241:8000/house/maitianzaixian?cityid='+cityid
	+'&kw='+kw+'&type=2&pageToken=1&apikey=RMw9hk7rtVbPfEkQZduqrCvuWs9PSeU7ePDQP0YKrtGQKxuG5d7uiWYeJ4t8vkPF'
		axios.get('http://localhost:23456/cina', {
			params: {
				para:urls
			}
		})
		.then(function(response) {
			console.log(response)
			var res = response.data.data
			self.setState({
				data: res,
				bool:false
			})
				console.log(self.state.data)
		})
	}

	render() {
		return(
			<div className="housejw">	
					<Xheads />
					<div className="nav">
						<InputGroup compact>
					      <Select key="1" defaultValue={this.state.defaultCity} className="cityss" onChange={this.onChange}>
					        {this.citytype()}
					      </Select>
					      <Select key="2" defaultValue="价格">
					        <Option value="200万以下">200万以下</Option>
					        <Option value="200万-300万">200万-300万</Option>
					        <Option value="300万-400万">300万-400万</Option>
					        <Option value="400万-500万">400万-500万</Option>
					        <Option value="500万-600万">500万-600万</Option>
					        <Option value="600万以上">600万以上</Option>
					      </Select>
					      <Select  key="3" defaultValue="大小">
					        <Option value="一室">一室</Option>
					        <Option value="二室">二室</Option>
					        <Option value="三室">三室</Option>
					        <Option value="四室">四室</Option>
					        <Option value="五室">五室</Option>
					        <Option value="六室">六室</Option>
					        <Option value="六室以上">六室以上</Option>
					      </Select>
					      <Select key="4" defaultValue="类型">
					        <Option value="地铁房">地铁房</Option>
					        <Option value="满五">满五</Option>
					        <Option value="有电梯">有电梯</Option>
					        <Option value="随时看房">随时看房</Option>
					        <Option value="带露台">带露台</Option>
					        <Option value="带车位">带车位</Option>
					        <Option value="带飘窗">带飘窗</Option>
					      </Select>
					    </InputGroup>
					</div>
					<div className={`example${this.state.bool?' showActive':''}`}>
	                    <Spin tip="Loding..."/>
	                </div>
					<div className="jwconent">
					{ this.state.data && this.state.data.map((item,idx)=>{
						 
						return	<li key={idx} className="clearfix conten" >
								<div className="pri fl">
	                                <Link target="_blank"  to="/datalist">
	                                    <img src={this.firstChildImg(item.imageUrls)}  className="mCS_img_loaded" />
	                                </Link>
	                                <div className="hide_border">
	                                	<Link target="_blank" to="/datalist">
	                                		<label>
	                                            {item.imageUrls.length}
	                                            	图
	                                        </label>
	                                	</Link>
	                                    
	                                </div>
	                            </div>
	                            <div className="list_title fl">
	                                <h1>
	                                	<Link to="/datalist" onClick={()=>{this.props.ok(item)}}>{item.title}</Link>
	                                </h1>
	                               	<p className="clearfix">
	                               		<span className="the_price fr">
	                                        <strong><em>{item.downPay*0.0001}</em>万元</strong><br /> （<em className="monthpay">{item.monthPay}</em>元/㎡）
	                                    </span>
	                                    <span className="fl">{item.district}</span><br />
	                                    <span className="fl">{item.courtName}</span><br />                                     
	                                    <span className="fl"><em> {item.landArea*0.001}</em>/平 </span>
	                               	</p>
	                                <p className="leixin">{this.typehouse(item.tags)}</p>
	                            </div>
                        	</li>
						})}
					</div>
					<div className="jwfooter">
					</div>
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
				type: "SETNEW",
				news: news
			})
		}
	}
})(Xhouse)