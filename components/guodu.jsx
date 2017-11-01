import React from "react";
import "./guodu.less";
import {Link} from 'react-router-dom'
class Xguodu extends React.Component{
	constructor(props){
		super(props);
		this.state={}
		this.back=()=>{
			window.history.go(-1);
			
		}
		this.next=()=>{
			
		}
	}
	componentDidMount(){
		
	}
	render(){
		return (
				<div id="guodu">
					<div className="top">
						<p><span className="back" onClick={this.back}></span>我的房产委托</p>
					</div>
					<div className="list">
						<ul>
							<img className="imgs" src="../img/6666"/>
							<li>
								<Link to="/entrust"><img src="../img/6661"/></Link>
								
							</li>
							<li>
								<Link to="/entrust"><img src="../img/6662"/></Link>
							</li>
							<li>
								<Link to="/entrust"><img src="../img/6663"/></Link>
							</li>
						</ul>
					</div>
				</div>
		)
		
	}
}


export default Xguodu;