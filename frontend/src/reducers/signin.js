
const initialStore = {
    authFlag : false,
    username : "",
    password : ""
}

const signinReducer = (state = initialStore,action) => {
    
    if(action.type === "signin" && action.payload.username === "admin" && action.payload.password==="admin"){
        return {
            ...state,
            authFlag : true,
        }
    }
    else if(action.type === "signin"){
        return {
            ...state,
            authFlag : false,
        }
    }
    else if(action.type === "signin"){
        return {
            ...state,
            authFlag : false,      
        }
    }
 
    return state;
}

export default signinReducer;