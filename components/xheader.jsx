import React from "react"
import {connect} from "react-redux";
import {Route, Link} from 'react-router-dom'
class Xheader extends React.Component{
		constructor(props){
			super(props)
			this.state={
				name:"煤渣"
			}
		}
		render(){
			return(
				<div>
					<Link to="/xhouse">二手房 </Link>
					<Link to="/xtenement">租房</Link>
					<Link to="/xentrust">卖房委托</Link>
				</div>
			)
		}

}
export default Xheader