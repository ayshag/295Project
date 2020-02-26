
const initialStore = {
    authFlag : false,
    username : "",
    password : ""
}

const signupReducer = (state = initialStore,action) => {
    
    if(action.type === "signup" && action.payload.username === "admin" && action.payload.password==="admin"){
        return {
            ...state,
            authFlag : true,
        }
    }
    else if(action.type === "signup"){
        return {
            ...state,
            authFlag : false,
        }
    }
    else if(action.type === "signup"){
        return {
            ...state,
            authFlag : false,      
        }
    }
 
    return state;
}

export default signupReducer;