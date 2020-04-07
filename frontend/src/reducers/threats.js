
const initialStore = {
    link : "",
    allThreats : [],
    displayThreats : [],
    id : 0,
    el : 0,
    searchErrorMsg : null,
    searchError : false
}

const threatsReducer = (state = initialStore,action) => {
    
    if(action.type === "threatsummary"){
      //  console.log(action.payload);
        //console.log(state.allThreats);
        //console.log(state.allThreats[action.payload]);
        var link = state.allThreats[action.payload];
        return {
            ...state,
            link : link,
            id : action.payload
        }

    } 
      
    if(action.type === "threats"){
       // console.log(action.payload);
        var links = [];
        for(var i = 0; i<action.payload.length; i++)
        {   
            links.push(action.payload[i].link);
         //   console.log(action.payload[i]);
        }
        
        return {
            ...state,
            allThreats : action.payload,
            displayThreats : action.payload
        }
    } 
    if(action.type === "search")
    {
        console.log("search action");
        console.log(action.payload);
        console.log(state.allThreats);

        var searchResults =[];
        for(var i = 0; i<state.allThreats.length; i++)
        {
            if(state.allThreats[i][action.payload.checked] === action.payload.query)
                searchResults.push(state.allThreats[i]);
        }
        return {
            ...state,
            displayThreats : searchResults
        }
    }
    if(action.type === "resetSearch")
    {
        console.log("reset action");
        console.log(state.allThreats);
        return {
            ...state,
            displayThreats : state.allThreats,
            searchErrorMsg : null,
            searchError : false

        }
    }
    if(action.type === "searchError")
    {
        var msg;
        if(action.payload.type === "radio")
            msg = "Please select a radio button to search......................................";
        else
            msg = "Please enter a search query....................................................";

      return {
          ...state,
          searchErrorMsg : msg,
          searchError : true
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
    allThreats : {},
    id : 0,
    el : 0
}

const threatsReducer = (state = initialStore,action) => {
    
    if(action.type === "threatsummary"){
        var link = "";
        switch(action.payload)
        {
            case 1 : link = state.allThreats.threat1; break;
            case 2 : link = state.allThreats.threat2; break;
            case 3 : link = state.allThreats.threat3; break;
            case 4 : link = state.allThreats.threat4; break;
            case 5 : link = state.allThreats.threat5; break;
            case 6 : link = state.allThreats.threat6; break;
            case 7 : link = state.allThreats.threat7; break;
            case 8 : link = state.allThreats.threat8; break;

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
            allThreats : action.payload,
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