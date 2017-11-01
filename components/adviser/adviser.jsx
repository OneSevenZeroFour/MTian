//引入
import React from "react";
import "./adviser.scss";
import { Rate } from 'antd';
import "antd/dist/antd.css";
import "../../public/font/iconfont.css";

class Adviser extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	arr:[]
        }
        this.scoreFor = ()=>{
        	console.log(this.state.arr)
        	if(this.state.arr.length !==0){
        		var self = this
        	return this.state.arr.map(function(items,idx){
        		var item = JSON.parse(items.guwen) 
        		return <li key={idx} className="contentLi">
        			<img src={item.img}/>
        			<div className="contentbox">
        				<div>
	        				<h4>{item.name}
	        					<span>
	        						<Rate disabled defaultValue={item.score}/>
	        					</span>
	        				</h4>
	        				<p>成交:二手房({item.two})|租房({item.three})</p>
	        				<p>服务:{item.ServiceScope}</p>
	        			</div>
	        			<button onClick={self.guwen.bind(this,item)} className={items.type==1?'xuactive':''}>关注</button>
	        			<button className={items.type==0?'xuactive':''} onClick={self.shanguwen.bind(this,item)}>取消关注</button>
	        			
        			</div>
        		</li>
        	})
        	}
        	
        }
        this.shanguwen=(item,event)=>{
        	$(event.target).prev().show()
        	$(event.target).hide()
        	
        	$.ajax({
					url:'http://localhost:23456/delguwen',
					type:'get',
					data:{username:18578650260,id:item.id,type:0},
					success:function(){
						
						
					}
				})
        }
        
        this.guwen=(item,event)=>{
        	$(event.target).hide()
        	$(event.target).next().show()
        	
        	$.ajax({
					url:'http://localhost:23456/delguwen',
					type:'get',
					data:{username:18578650260,id:item.id,type:1},
					success:function(){
						
						
					}
				})
        }
       
    }
    render() {
        return (
          <div id="adviser">
          	<div className="header">
          		<h5>找顾问</h5>
          	</div>
          	<div className="content">
          		<ul className="contentUl">{this.scoreFor()}</ul>
          	</div>
          </div>
        )
    }
    componentDidMount(){
    	var self = this
 		$.ajax({
					url:'http://localhost:23456/getguwen',
					type:'get',
					data:{username:18578650260,faces:666},
					success:function(data){
						var res = JSON.parse(data).results
						console.log(res)
						self.setState({arr:res})
						
					}
				})
    }


}


//导出
export default Adviser;