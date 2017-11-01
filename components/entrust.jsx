import React from "react"
import {connect} from "react-redux";
import {Route, Link} from 'react-router-dom'
import { Input, Icon ,Cascader,Select, DatePicker,Button, notification} from 'antd';
import axios from "axios"
import 'antd/dist/antd.css'
import "./css/entrust.css"
const InputGroup = Input.Group;
const Option = Select.Option;
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: '提交成功',
    description: '你的委托已提交成功，请继续委托或返回浏览'
  });
};
var width={
	width:'100%'
}
const  optionsbj = [{
  value: '朝阳',
  label: '朝阳',
  children: [{
			    value: '朝阳公园',
			    label: '朝阳公园',
			  },{
			    value: '朝阳门外',
			    label: '朝阳门外',
			  },{
			    value: '北工大',
			    label: '北工大',
			  },
			 {
			    value: '国贸',
			    label: '国贸',
			  },
			  {
			    value: '欢乐谷',
			    label: '欢乐谷',
			  },
			  {
			    value: '建国门外',
			    label: '建国门外',
			  },
			  {
			    value: '亚运村',
			    label: '亚运村',
			  },
			  {
			    value: '中央别墅区',
			    label: '中央别墅区',
			  },
  ],
}, {
  value: '大兴',
  label: '大兴',
  children: [{
			    value: '西红门',
			    label: '西红门',    
			  },
			  {
			    value: '天宫院',
			    label: '天宫院',
			  },
			  {
			    value: '新宫',
			    label: '新宫',
			  },{
			    value: '黄村中',
			    label: '黄村中',
			  },
			  {
			    value: '观音寺',
			    label: '观音寺',
			  },
  			],
},{
  value: '石景山',
  label: '石景山',
  children: [{
			    value: '苹果园',
			    label: '苹果园',    
			  },
			  {
			    value: '八角',
			    label: '八角',
			  },
			  {
			    value: '古城',
			    label: '古城',
			  },{
			    value: '老山',
			    label: '老山',
			  },
			  {
			    value: '玉泉路',
			    label: '玉泉路',
			  },
  			],
},{
  value: '海淀',
  label: '海淀',
  children: [{
			    value: '白石桥',
			    label: '白石桥',    
			  },
			  {
			    value: '北部新区',
			    label: '北部新区',
			  },
			  {
			    value: '二里庄',
			    label: '二里庄',
			  },{
			    value: '定慧寺',
			    label: '定慧寺',
			  },
			  {
			    value: '公主坟',
			    label: '公主坟',
			  },
  			],
}

];

const optionsfz = [{
  value: '鼓楼',
  label: '鼓楼',
  children: [{
			    value: '东街口',
			    label: '东街口',
			  },{
			    value: '大儒商圈',
			    label: '大儒商圈',
			  },{
			    value: '省政府',
			    label: '省政府',
			  },
			 {
			    value: '乌山路',
			    label: '乌山路',
			  },
			  {
			    value: '三坊七巷',
			    label: '三坊七巷',
			  },
			  {
			    value: '建国门外',
			    label: '建国门外',
			  },
			  {
			    value: '五四路',
			    label: '五四路',
			  },
			  {
			    value: '五一广场',
			    label: '五一广场',
			  },
  ],
}, {
  value: '台江',
  label: '台江',
  children: [{
			    value: '台江万达',
			    label: '台江万达',    
			  },
			  {
			    value: '台江排尾',
			    label: '台江排尾',
			  },
			  {
			    value: '茶亭',
			    label: '茶亭',
			  },{
			    value: '上下杭城',
			    label: '上下杭城',
			  },
			  {
			    value: '瀛洲红星',
			    label: '瀛洲红星',
			  },
  			],
},{
  value: '晋安',
  label: '晋安',
  children: [{
			    value: '东二环',
			    label: '东二环',    
			  },
			  {
			    value: '福马路',
			    label: '福马路',
			  },
			  {
			    value: '福新路',
			    label: '福新路',
			  },{
			    value: '国货路',
			    label: '国货路',
			  },
			  {
			    value: '鼓山新区',
			    label: '鼓山新区',
			  },
  			],
},{
  value: '金山',
  label: '金山',
  children: [{
			    value: '金山大道',
			    label: '金山大道',    
			  },
			  {
			    value: '金山公园',
			    label: '金山公园',
			  },
			  {
			    value: '闽江大道',
			    label: '闽江大道',
			  },{
			    value: '浦上大道',
			    label: '浦上大道',
			  },
			  {
			    value: '榕城广场',
			    label: '榕城广场',
			  },
  			],
},{
  value: '苍山',
  label: '苍山',
  children: [{
			    value: '白湖亭',
			    label: '白湖亭',    
			  },
			  {
			    value: '苍山步行街',
			    label: '苍山步行街',
			  },
			  {
			    value: '火车南站',
			    label: '火车南站',
			  },{
			    value: '三叉街',
			    label: '三叉街',
			  },
			  {
			    value: '南江滨',
			    label: '南江滨',
			  },
  			],
},{
  value: '马尾',
  label: '马尾',
  children: [{
			    value: '江滨东大道（快安）',
			    label: '江滨东大道（快安）',    
			  },
			  {
			    value: '马尾市区',
			    label: '马尾市区',
			  },
			  
  			],
}

];
const optionsxm= [{
  value: '海沧区',
  label: '海沧区',
  children: [{
			    value: '东街口',
			    label: '东街口',
			  },{
			    value: '大儒商圈',
			    label: '大儒商圈',
			  },{
			    value: '省政府',
			    label: '省政府',
			  },
			 {
			    value: '乌山路',
			    label: '乌山路',
			  },
			  {
			    value: '三坊七巷',
			    label: '三坊七巷',
			  },
			  {
			    value: '建国门外',
			    label: '建国门外',
			  },
			  {
			    value: '五四路',
			    label: '五四路',
			  },
			  {
			    value: '五一广场',
			    label: '五一广场',
			  },
  ],
}, {
  value: '思明区',
  label: '思明区',
  children: [{
			    value: '台江万达',
			    label: '台江万达',    
			  },
			  {
			    value: '台江排尾',
			    label: '台江排尾',
			  },
			  {
			    value: '茶亭',
			    label: '茶亭',
			  },{
			    value: '上下杭城',
			    label: '上下杭城',
			  },
			  {
			    value: '瀛洲红星',
			    label: '瀛洲红星',
			  },
  			],
},{
  value: '湖里区',
  label: '湖里区',
  children: [{
			    value: '东渡',
			    label: '东渡',    
			  },
			  {
			    value: '枋湖',
			    label: '枋湖',
			  },
			  {
			    value: '湖边水库',
			    label: '湖边水库',
			  },{
			    value: '金上',
			    label: '金上',
			  },
			  {
			    value: '江头',
			    label: '江头',
			  },
  			],
}
];
class Xentrust extends React.Component{
		constructor(props){
			super(props)
			this.state={
				xqName: '',
				userName:"",
				citytx:"北京",
				address:[],
				typehouse:"",
				rentType:"卖房",
				options:optionsbj			}
			
			this.emitEmpty = () => {
			    this.xqNameInput.focus();
			    this.setState({ xqName: '' });
  			}
			
			this.onChangexqName = (e) => {
			    this.setState({ xqName: e.target.value });
			}
			
			this.onChange=(value)=>{
				  console.log(value)
				  this.setState({ address: value });
			}
			
			this.emitEmptyname = () => {
			    this.userNameInput.focus();
			    this.setState({ userName: '' });
  			}
			
			this.onChangeUserName = (e) => {
			    this.setState({ userName: e.target.value });
			}
			
			this.citytx=(event)=>{
				var options=[];
				if(event=="北京"){
					options=optionsbj
				}else if(event=="福州"){
					options=optionsfz
				}else if(event=="厦门"){
					options=optionsxm
				}
				console.log(options)
				this.setState({
					citytx:event,
					options:options
				})
			}
			this.typehouse=(event)=>{
					console.log(event)
					this.setState({
					typehouse:event
				})
			}
			this.rentType=(event)=>{
					this.setState({
					rentType:event
				})

			}
			this.Message=()=>{
				console.log(this.state.citytx)
				var city=this.state.citytx
				console.log(this.state.xqName)
				var community =this.state.xqName
				console.log(this.state.address)
				var address=this.state.address
				console.log(this.state.typehouse)
				var type=this.state.typehouse
				console.log($(this.refs.numpricr).val())
				var price=$(this.refs.numpricr).val()
				var rentType=this.state.rentType
				console.log($(this.refs.tell).val())
				var tel=$(this.refs.tell).val()
				console.log(this.state.userName)
				var userName=this.state.userName
				console.log($(this.refs.areas).val())
				var msg=$(this.refs.areas).val()
				axios.get('http://localhost:23456/jwrent', {
				params: {
						city:city,
						community:community,
						address:address,
						type:type,
						price:price,
						tel:tel,
						username:userName,
						msg:msg,
						rentType:rentType
				}
			})
			.then(function(response) {
				console.log(response)
			})
			}
		}
		
		render(){
			const { xqName } = this.state;
    	const suffix = xqName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    	const { userName } = this.state;
    	const suffixx = userName ? <Icon type="close-circle" onClick={this.emitEmptyname} /> : null;
			return(
				<div>
					<div className="header">
						<Icon type="left" />
						<span>委托</span>
					</div>
					<div className="main">
						<h3>填写您的房产信息吧!</h3>
						<InputGroup compact>
						<Select defaultValue="卖房" onChange={this.rentType}>
					        <Option value="卖房">卖房</Option>
					        <Option value="买房">买房</Option>
					        <Option value="租房">租房</Option>
					    </Select> 
					   </InputGroup>
						<InputGroup compact>
						<Select defaultValue="北京" onChange={this.citytx}>
					        <Option value="北京">北京</Option>
					        <Option value="福州">福州</Option>
					        <Option value="厦门">厦门</Option>
					    </Select> 
					   </InputGroup>
					    <div className="xq">
					    	<Input
						        placeholder="请输入小区名称"
						        prefix={<Icon type="home" />}
						        suffix={suffix}
						        value={xqName}
						        onChange={this.onChangexqName}
						        ref={node => this.xqNameInput = node}
						      />
					    
					    </div>
					    <div className="quyu">
					    	<Cascader options={this.state.options} onChange={this.onChange} placeholder="请选择你的区域" key={this.state.options.value}/>
					    </div>
					    <div className="huxin">
					    	<InputGroup compact>
								<Select  defaultValue="请选择你的户型" onChange={this.typehouse}>
							        <Option value="一室">一室</Option>
							        <Option value="二室">二室</Option>
							        <Option value="三室">三室</Option>
							        <Option value="四室">四室</Option>
							        <Option value="五室">五室</Option>
							        <Option value="六室及以上">六室及以上</Option>
							    </Select> 
							 </InputGroup>
					    </div>
					    <div className="numpricr">
					    	<input type="number" placeholder="请输入你期望的价格" ref="numpricr"/>
					    </div>
					    <div className="areas">
					    	<textarea rows={4} ref="areas" style={width}></textarea>
					    </div>
					    <div className="username">
					    	<Input
						        placeholder="请输入姓名"
						        prefix={<Icon type="user" />}
						        suffix={suffixx}
						        value={userName}
						        onChange={this.onChangeUserName}
						        ref={node => this.userNameInput = node}
						      />
					    </div>
					    <div className="tell">
					    <input type="tel" placeholder="请输入你的电话号码" ref="tell"/>
					    </div>
					    	<div className="btn" onClick={this.Message} >
					    	<Button onClick={() => openNotificationWithIcon('success')}>提交给麦田</Button>
					    	</div>
					    <p className="ftr">提交成功后,麦田房产顾问会及时与你取得联系</p>
					</div>
				</div>
			)
		}

}
export default Xentrust