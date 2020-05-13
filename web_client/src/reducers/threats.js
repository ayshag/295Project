
const initialStore = {
    link : "",
    allThreats : [],
    displayThreats : [],
    id : 0,
    el : 0,
    searchErrorMsg : null,
    searchError : false,
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
        console.log(action.payload);
        var isThreats = [];
        for(var i = 0; i<action.payload.length; i++)
        {
            //Checking is threats
            if(action.payload[i].isThreat)
                isThreats.push(action.payload[i]);
        }
        //console.log(isThreats);
            var temp;
        for(var i = 0; i<isThreats.length; i++)
        {
            if(isThreats[i].date)
            {
            var date_i =  isThreats[i].date.split('-');
            var time_i = date_i[3].split(':');
          //  console.log(date_i);
          //  console.log(time_i);
            for(var j = i+1; j<isThreats.length; j++)
            {
                if(isThreats[j].date)
                {
                var date_j = isThreats[j].date.split('-');
                var time_j = date_j[3].split(':');
              //  console.log(date_j);
               // console.log(time_j);
                if(parseInt(date_j[0]) > parseInt(date_i[0]))
                {
                    temp = isThreats[i];
                    isThreats[i] = isThreats[j];
                    isThreats[j] = temp;
                    date_i =  isThreats[i].date.split('-');
                    time_i = date_i[3].split(':');
                }
                else if(parseInt(date_j[0]) == parseInt(date_i[0]))
                {
                  
                    if(parseInt(date_j[1]) > parseInt(date_i[1]))
                    {
                        temp = isThreats[i];
                        isThreats[i] = isThreats[j];
                        isThreats[j] = temp;
                        date_i =  isThreats[i].date.split('-');
                        time_i = date_i[3].split(':');
                    }
                    else if(parseInt(date_j[1]) == parseInt(date_i[1]))
                    {
                
                        if(parseInt(date_j[2]) > parseInt(date_i[2]))
                        {
                            console.log('should swap');
                            temp = isThreats[i];
                            isThreats[i] = isThreats[j];
                            isThreats[j] = temp;
                            date_i =  isThreats[i].date.split('-');
                            time_i = date_i[3].split(':');
                        }
                        else if(parseInt(date_j[2]) == parseInt(date_i[2]))
                        {
                            if(parseInt(time_j[0]) > parseInt(time_i[0]))
                            {
                                temp = isThreats[i];
                                isThreats[i] = isThreats[j];
                                isThreats[j] = temp;
                                date_i =  isThreats[i].date.split('-');
                                time_i = date_i[3].split(':');
                            }
                            else if(parseInt(time_j[0]) == parseInt(time_i[0]))
                            {
                                if(parseInt(time_j[1]) > parseInt(time_i[1]))
                                {
                                    temp = isThreats[i];
                                    isThreats[i] = isThreats[j];
                                    isThreats[j] = temp;
                                    date_i =  isThreats[i].date.split('-');
                                    time_i = date_i[3].split(':');
                                }
                                else if(parseInt(time_j[1]) == parseInt(time_i[1]))
                                {
                                    if(parseInt(time_j[2]) > parseInt(time_i[2]))
                                    {
                                        temp = isThreats[i];
                                        isThreats[i] = isThreats[j];
                                        isThreats[j] = temp;
                                        date_i =  isThreats[i].date.split('-');
                                        time_i = date_i[3].split(':');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }}
        }
        console.log(isThreats);
        //var date = isThreats[0].date.split('-');

        //console.log(date[0]);
       
        return {
            ...state,
            allThreats : isThreats,
            displayThreats : isThreats
        }
    } 
    if(action.type === "search")
    {
        console.log("search action");
        console.log(action.payload);
        console.log(state.allThreats);
        console.log(action.payload)

        var searchResults =[];
        for(var i = 0; i<state.allThreats.length; i++)
        {
            if(state.allThreats[i][action.payload.checked] + '' === action.payload.query)
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
    if(action.type === "classify")
    {
        console.log(action.payload.link)
        var updateThreats = [];
        for(var i = 0; i<state.allThreats.length; i++)
        {
            if(action.payload.link != state.allThreats[i].link)
                updateThreats.push(state.allThreats[i]);
        }
        return {
            ...state,
            allThreats : updateThreats,
            displayThreats : updateThreats
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