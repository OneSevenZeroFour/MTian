import {createStore} from "redux";
let store = createStore((state={name:"小菜鸟",city: "0",id:1},action)=>{
	
	switch (action.type){
		case "SETNEW":
		return Object.assign({},state,{news: action.news})
		console.log(action)
      	break;
      	
      	case "SETRENT":
		return Object.assign({},state,{newt: action.newt})
      	break;
      	
      	case "SETMAP":
      		return {
      			city: action.city
      		}
      		break;
      		
      	case "SETAGE":
      		return Object.assign({}, state, {
      			name: action.name,
      			id: action.id
      		})
      		break;
      		
      		
      	default:
      	 return state
	}
}
	
)
export default store


