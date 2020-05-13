
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import threatsReducer from "./threats";


const rootReducer = combineReducers({

  threatsReducer : threatsReducer,
  form: formReducer
});

export default rootReducer;
