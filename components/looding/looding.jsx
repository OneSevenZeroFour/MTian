import React from "react";
import "./looding.scss";

class Looding extends React.Component{
	constructor(props) {
        super(props);
    }
    render() {
        return (
          <div id="LY_looding">
            <h1>麦田</h1>
            <p>守望麦田 家的方向</p>
          </div>
        )
    }
}

//导出
export default Looding;