import React from "react"
import store from "../store.js";
import {connect} from "react-redux";
import axios from 'axios'
import {Route, Link} from 'react-router-dom'
import {Button,Radio,Icon} from 'antd';
import {HashRouter as Router, Redirect} from 'react-router-dom'
import 'antd/dist/antd.css'
import "./css/house.css"
class Xhead extends React.Component{
	constructor(props){
			super(props)
			this.state={
				type:{
					buy:"二手房",
					rent:"租房"
				},
				size: 'large',
				color:'#fff',
				backgroundColor:"#ff5722",
				isshow:true,
				data:[]
			}
			this.changColorBUY=()=>{
				this.refs.titcolor.style.color=this.state.color;
				this.refs.titcolor.style.backgroundColor=this.state.backgroundColor
				this.refs.titlcolor.style.color=this.state.backgroundColor;
				this.refs.titlcolor.style.backgroundColor=this.state.color
				console.log(this.state.data);
				console.log(this.state.isshow)
				this.setState({isshow:false})
			}
			this.changColorRent=()=>{
				this.refs.titlcolor.style.color=this.state.color;
				this.refs.titlcolor.style.backgroundColor=this.state.backgroundColor
				this.refs.titcolor.style.color=this.state.backgroundColor;
				this.refs.titcolor.style.backgroundColor=this.state.color
				this.setState({isshow:true})
			}
			
			this.back = () => {
				window.history.go(-1);
			
			}
	}
	render(){
	const size = this.state.size;
	return(
		<div className="jwhead">
			<header>
				<Icon type="left" onClick={this.back}/>
				<p><Link to="/xhouse"><span ref="titcolor" onClick={this.changColorBUY}>{this.state.type.buy}  </span></Link><Link to="/xtenement"><span ref="titlcolor" onClick={this.changColorRent}>{this.state.type.rent}</span></Link></p>
				<Icon type="search" />
			</header>
		</div>
	)}
}
export default Xhead