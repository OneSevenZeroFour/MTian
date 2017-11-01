import React from "react";
import "./attention.less";
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
class Xattention extends React.Component{
	constructor(props){
		super(props);
		
		this.state={title:"房产顾问",show:"false",id:1,list:[]}
		
		this.setTitle=(event)=>{
			
			var arr=this.refs.list.children
			
			if(event.target.innerHTML==='房产顾问'){
				
				this.setState({title:"房产顾问",id:1})
				for(var i=0;i<arr.length;i++){
					arr[i].style.display="none"
				}
				this.refs.list_4.style.display="block"
				var self = this
				setTimeout(function(){
					self.aj()
				},30)
			}else if(event.target.innerHTML==='二手房'){
				this.setState({title:event.target.innerHTML,id:2})
				for(var i=0;i<arr.length;i++){
					arr[i].style.display="none"
				}
				this.refs.list_2.style.display="block"
			
				var self = this
				setTimeout(function(){
					self.aj()
				},30)
				
			}else{
				this.setState({title:event.target.innerHTML,id:3})
				for(var i=0;i<arr.length;i++){
					arr[i].style.display="none"
				}
				this.refs.list_3.style.display="block"
				var self = this
				setTimeout(function(){
					self.aj()
				},30)
			}
		}
		
		this.back=()=>{
			window.history.go(-1);
			
		}
		
		this.showList = ()=>{
			var self = this
			if(this.state.list!==""){
				var list = this.state.list
				console.log(list)
			var res=list.map(function(item,idex){
				var downPay;
				var monthPay;
				if(item.type==2){
					 downPay = item.downPay/10000+"万元"
					monthPay = item.monthPay+"元/平"
				}else{ downPay = item.downPay+"元/月"
					monthPay = item.monthPay
					}
				
						return <li key={idex}>
								<img src={item.img}/>
								<div>
									<p>{item.title}</p>
									<span className="s_1">{downPay}</span>
									<span className="s_2">{monthPay}</span>
									<span className="s_3">{item.courtName}</span>								
								</div>
								
							</li>
								
			})
				return res
			}
		}	
		
//		this.tips=(item)=>{
//			if(item){
//				console.log(JSON.parse(item))
//			var arr = JSON.parse(item)
//		var res = arr.map(function(item,idex){
//				return <span key={idex}    className={`s_4${idex%2==0?' red':' green'}`} >{item}</span>
//			})
//		return res
//			}
//			
//		}
		
		this.guwen=()=>{
			
			var self = this
			var list = this.state.list
			
			var res = list.map(function(item,idx){
				
				var items = JSON.parse(item.guwen) 
				if(items){
					return <li key={idx}>
								<span className="msg"></span>
								<img src={items.img}/>
								<div>
									<p className="p_1"><span>{items.name}</span><span></span></p>
									<p>成交：二手房{items.two}|租房:{items.three})</p>
									<p className="p_4">服务范围：{items.ServiceScope}</p>
								</div>
							</li>
				}
				
				
				
			})
				return res
			
		}
		
		this.aj=()=>{
			var self = this
			$.ajax({
				url:"http://localhost:23456/xgetAll",
				type:'get',
				data:{username:18578650260,type:self.state.id},
				success:function(data){
					console.log(data)
					var res = JSON.parse(data).results
					console.log(self.state.type)
					console.log(res)
					self.setState({list:res})	
					if(self.state.list.length == 0) {
						$(self.refs.list_1).show()
					}
					
				}
			})
		}
	}
	componentDidMount(){
		this.setState({id:this.props.id})
		console.log(this.props.id)
		var self = this
				setTimeout(function(){
					self.aj()
				},30)
		var arr=this.refs.list.children
		if(this.props.id===2){
			$(this.refs.list_2).show().siblings().hide();
		}
		
		
	}
	
	render(){
		return (
			<div id="attention">
				<div className="top">
						<p><span className="back" onClick={this.back}></span>我的关注</p>
					</div>
				<div className="nav">
					<ul>
						<li onClick={this.setTitle} className={this.state.id=='1'?'tips':''}>房产顾问</li>
						<li onClick={this.setTitle} className={this.state.id=='2'?'tips':''}>二手房</li>
						<li onClick={this.setTitle} className={this.state.id=='3'?'tips':''}>租房</li>
					</ul>
					
				</div>
				<div className="list"  ref="list">
					<div className="list_1" ref="list_1">
						<img src="../img/11.png"/>
						<p>您还还没有关注{this.state.title}，赶紧去关注吧</p>
					</div>
					<div className={`list_2${this.state.id==2?'':' hidde'}`} ref="list_2">
						<ul>
							{this.showList()}
						</ul>
					</div>
					<div className="list_3" ref="list_3">
						<ul>
							{this.showList()}	
						</ul>
					</div>
					
					<div className="list_4" ref="list_4">
						<ul>
							{this.guwen()}
						</ul>
					</div>
				</div>
				<div className="footer"></div>
			</div>
		)
	}
}

export default connect((state) => {
  console.log(state)
  return state
})(Xattention);