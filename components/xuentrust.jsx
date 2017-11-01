import React from "react";
import "./xuentrust.less";
import {Link} from 'react-router-dom'

class Xuentrust extends React.Component{
	constructor(props){
		super(props);
		this.state={id:4,list:[],rentType:"买房"}
		this.setTitle=(idx,event)=>{
			var self = this
			console.log(event.target.innerHTML)
			var tentTpye =  event.target.innerHTML
			this.setState({id:idx})
			this.aj(tentTpye)
			setTimeout(function(){
				if(self.state.list.length == 0) {
				$(self.refs.list_1).show()
				}else{$(self.refs.list_1).hide()}
			},30)
			
		}
		
		this.showList = ()=>{
			var self = this
			if(this.state.list!=="" ){
				var list = this.state.list
				
				 
			var res=list.map(function(item,idex){
						return <li key={idex}>
								
								<div>
									<p>姓名: {item.username}</p>
									<p>电话号码: {item.tel}</p>
									<p>价格: {item.price}</p>
									<p>户型: {item.type}</p>
									<p>所在区域: {item.address}</p>
									<p>小区名称: {item.community}</p>						
								</div>
								
							</li>
								
			})
				return res
			}
		}	
		
		this.aj=(idx)=>{
			var self = this
			console.log(idx)
			$.ajax({
				url:"http://localhost:23456/xgetFang",
				type:'get',
				data:{rentType:idx},
				success:function(data){
					var res = JSON.parse(data).results
					console.log(res)
					self.setState({list:res})	
					
				}
			})
		}
		
//		this.tips=(item)=>{
//			var arr = item.split(",")
//		var res = arr.map(function(item,idex){
//				return <span key={idex}    className={`s_4${idex%2==0?' red':' green'}`} >{item}</span>
//			})
//		return res
//		}
//		
		this.back=()=>{
			window.history.go(-1);
			
		}
		this.next=()=>{
			
		}
	}
	componentDidMount(){
		this.aj(this.state.rentType)
	}
	render(){
		return (
				<div id="xuentrust">
					<div className="top">
						<p><span className="back" onClick={this.back}></span>我委托的房源<Link to="/guodu"><span className="next">新增</span></Link></p>
					</div>
					<div className="nav">
						<ul>
							
							<li onClick={this.setTitle.bind(this,4)} className={this.state.id==4?'tips':''} >买房</li>	
							<li onClick={this.setTitle.bind(this,2)} className={this.state.id==2?'tips':''} >卖房</li>
							<li onClick={this.setTitle.bind(this,3)} className={this.state.id==3?'tips':''} >租房</li>
						</ul>
					
					</div>
					<div className="list_1" ref="list_1" >
						<img src="../img/11.png"/>
						<p>您还还没有委托的房源,赶紧来添加委托吧</p>
					</div>
					<div className="list_3" ref="list_3">
						<ul>
							{this.showList()}	
						</ul>
					</div>
					<div className="footer"></div>
				</div>
		)
		
	}
}


export default Xuentrust;