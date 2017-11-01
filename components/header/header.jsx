//引入
import React from "react";
import {connect} from "react-redux";
import "./header.scss";
import "../../public/font/iconfont.css";  


class Header extends React.Component{
	constructor(props) {
        super(props);

        this.state = {
          navTop: false,
          offsetTop:0
        }
   
        this.$tab = null;
       
    }

    handleScroll(){
      var sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    
      if(sTop >= this.state.offsetTop){
 
        this.setState({
          navTop: true
        })
      }
   
      if(sTop < this.state.offsetTop){
         this.setState({
           navTop:false
         })
      }
    }

    componentDidMount(){
      var self = this;
      this.$tab = this.refs.tab;
      if(this.$tab){
        this.setState({
          offsetTop: (this.$tab.offsetTop-12)
        })
        window.addEventListener('scroll',this.handleScroll.bind(self));
      }
    }

    render() {
        return (
          <div id="LY_header">
           	<div className="imgbox">
           		<img src="http://xm.maitian.cn/Skin/images/home/slogan-xm.png"/>
           	</div>
           	<div className={`searchbox${this.state.navTop?' fixed':''}`} ref="tab">
                <select onChange={this.props.map}>
                    <option value="0">北京</option>
                    <option value="FZ:3">福州</option>
                    <option value="XM:4">厦门</option>
                </select>
             		<form>
             			<input type="text" placeholder="输入小区名称名称找到您的家"/>
             			<span className="iconfont icon-soushuo"></span>
             		</form>
           	</div>

          </div>
        )
    }
}


//导出
export default connect((state) => {
  return state
}, (dispatch) => {
  return {
    map(event) {
      console.log(event.target.value)
      dispatch({type: "SETMAP", city: event.target.value})
    }
  }
})(Header);