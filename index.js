// react redux react-router webpack sass es6 jsx axios
import React from "react";
import $ from "jquery";
window.$ = $;
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom'
//徐啸
import Xpersonal from "./components/xpersonal.jsx";
import Xattention from "./components/attention.jsx";
import Xuentrust from "./components/xuentrust.jsx";
import Xguodu from "./components/guodu.jsx";


//刘韵
import Footer from "./components/footer/footer.jsx";
import Home from "./components/home/home.jsx";
import Adviser from "./components/adviser/adviser.jsx";


//江伟
import Xheader from "./components/xheader.jsx"
import Xhouse from "./components/second-house.jsx"
import Tenement from "./components/tenement.jsx"
import Datalist from "./components/datalist.jsx"
import Rentlist from "./components/rentlist.jsx"
import Xhead from "./components/head.jsx"
import Entrust from "./components/entrust.jsx";


import store from "./store.js"


ReactDOM.render(
  <Router>
  <Provider store={store}>
    <div>

			<Route exact path="/" component={Home}/>
			<Route  path="/adviser" component={Adviser}></Route>
			<Footer/>		
			

      <Route  path="/personal" component={Xpersonal}></Route>
      <Route  path="/attention" component={Xattention}></Route>
      <Route  path="/xuentrust" component={Xuentrust}></Route>
      <Route  path="/guodu" component={Xguodu}></Route>
      

			<Route path="/xhouse" component={Xhouse}></Route>
			<Route path="/datalist" component={Datalist}></Route>
			<Route path="/xtenement" component={Tenement}></Route>
			<Route path="/xhead" component={Xhead}></Route>
			<Route path="/xrentlist" component={Rentlist}></Route>
      <Route  path="/entrust" component={Entrust}></Route>
      
    </div>
  </Provider>
</Router>, document.getElementById("demo"))
