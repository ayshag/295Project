
const initialStore = {
    link : "",
    time : null
}

const surveillanceReducer = (state = initialStore,action) => {
    
    if(action.type === "surveillance"){
        return {
            ...state,
            link : action.payload.link,
        }
    } 

    if(action.type === "updateTime"){
        return {
            ...state,
            time : new Date(),
        }
    } 
    return state;
}

export default surveillanceReducer;