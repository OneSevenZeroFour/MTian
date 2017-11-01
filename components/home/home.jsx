//引入
import React from "react";

import Header from "../header/header.jsx";
import Body from "../body/body.jsx";

class Home extends React.Component{
	constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
           	<Header/>
           	<Body/>
          </div>
        )
    }
    

}

//导出
export default Home;