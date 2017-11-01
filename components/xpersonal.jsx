import React from "react";
import "./personal.less"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
class Xpersonal extends React.Component {
	constructor(props) {
    super(props);
    this.state = {imgurl:''}
    this.chuan =()=>{
    console.log(666)
    			var  self = this
   				$.ajax({ 
                    url: 'http://localhost:23456/chuan',
                    type: 'POST',
                    cache: false, //不必须
                    data: new FormData($('#uploadForm')[0]),
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        console.log(data[0].filename)
                        self.setState({imgurl:'../img/'+data[0].filename})
												$.ajax({
                            url:"http://localhost:23456/getAccount",
                            type:"post",
                            data:{username:"18578650260",imgurl:data[0].filename},
                            success:function(data){
                                
                            }
                        })
                    }
                })
    }
    
    
  }
  
  componentDidMount(){
  	
  	console.log(this.props)
  }
  
  render() {
    return (
      <div id="personal">
      	<div className="top">
      		<p>我</p>
      	</div>
        <div className="show">
        	<div>
        		<label htmlFor="file">
        		<span className="tou">
        			<form id="uploadForm">
        				<input type="file" name="logo" id="file" onChange={this.chuan}/>
        			</form>
        			<img src={this.state.imgurl}/>
        		</span>
        		</label>
        		<p>18578650260</p>
        	</div>
        </div>
       	<div className="list">
       		<ul>
       			<Link to="/xuentrust" >
       				<li >
       				<span className="list_1"></span><p className="s_1">我委托的房源</p>
       				</li>
       			</Link>	
       			<Link to="/attention" >
	       			<li onClick={this.props.ok}>
	       				<span className="list_2"></span>我关注的小区
	       			</li>
	       		</Link>
	       			<li>
       				<span className="list_3" ></span>我的找房需求
	       			</li>
       			<li>
       				<span className="list_4"></span>分享二维码
       			</li>
       			<li>
       				<span className="list_5"></span>分享给好友
       			</li>
       			<li>
       				<span className="list_6"></span>经纪人邀请码
       			</li>
       		</ul>
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
  	ok(){
  		dispatch({type: "SETAGE", id: 2})
  	}
  	
  }
})(Xpersonal)