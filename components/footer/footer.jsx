//引入
import React from "react";
import "../../public/font/iconfont.css";
import "./footer.scss";

class Footer extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	arr:[{
        		name:"首页",
        		icon:"iconfont icon-shouye",
        		path:"#/"
        	},{
        		name:"顾问",
        		icon:"iconfont icon-guwen",
        		path:"#/adviser"
        	},{
        		name:"关注",
        		icon:"iconfont icon-guanzhu_n",
        		path:"#/attention"
        	},{
        		name:"我",
        		icon:"iconfont icon-wo",
        		path:"#/personal"
        	}],
        	showId:0
        }
        this.footFor = ()=>{
        	var self = this;
        	return self.state.arr.map(function(item,idx){
        		return <li key={idx} data-id={idx} ref={idx} onClick={() => self.shows(idx)} className={`${self.state.showId==idx?'active':''}`}>
	        		<a href={item.path}>
		        		<i className={item.icon}></i>
		        		<p>{item.name}</p>
	        		</a>
        		</li>
        	})
        }
        this.shows = (idx)=>{
        	var self = this;
        	this.setState({
        		showId:idx
        	})
        }
    }
    render() {
        return (
          <div id="LY_footer">
          	<ul>{this.footFor()}</ul>
          </div>
        )
    }
    

}

//导出
export default Footer;
