
const initialStore = {
    link : "",
    threatlinks : [],
    id : 0,
    el : 0
}

const threatsReducer = (state = initialStore,action) => {
    
    if(action.type === "threatsummary"){
        var link = "";
        switch(action.payload)
        {
            case 1 : link = state.threatlinks[0]; break;
            case 2 : link = state.threatlinks[1]; break;
            case 3 : link = state.threatlinks[2]; break;
            case 4 : link = state.threatlinks[3]; break;
            case 5 : link = state.threatlinks[4]; break;
            case 6 : link = state.threatlinks[5]; break;
            case 7 : link = state.threatlinks[6]; break;
            case 8 : link = state.threatlinks[7]; break;

        }
        return {
            ...state,
            link : link,
            id : action.payload
        }

    } 
      
    if(action.type === "threats"){
        console.log(action.payload);
        return {
            ...state,
            threatlinks : action.payload,
        }
    } 

    if(action.type === "updateel"){
        console.log(action.payload);
        return {
            ...state,
            el : state.el+1,
        }
    }
    return state;
}


export default threatsReducer;
/*
const initialStore = {
    link : "",
    threatlinks : {},
    id : 0,
    el : 0
}

const threatsReducer = (state = initialStore,action) => {
    
    if(action.type === "threatsummary"){
        var link = "";
        switch(action.payload)
        {
            case 1 : link = state.threatlinks.threat1; break;
            case 2 : link = state.threatlinks.threat2; break;
            case 3 : link = state.threatlinks.threat3; break;
            case 4 : link = state.threatlinks.threat4; break;
            case 5 : link = state.threatlinks.threat5; break;
            case 6 : link = state.threatlinks.threat6; break;
            case 7 : link = state.threatlinks.threat7; break;
            case 8 : link = state.threatlinks.threat8; break;

        }
        return {
            ...state,
            link : link,
            id : action.payload
        }

    } 
      
    if(action.type === "threats"){
        console.log(action.payload);
        return {
            ...state,
            threatlinks : action.payload,
        }
    } 

    if(action.type === "updateel"){
        console.log(action.payload);
        return {
            ...state,
            el : state.el+1,
        }
    }
    return state;
}


export default threatsReducer;

*/