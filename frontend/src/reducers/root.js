
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import signupReducer from "./signup";
import signinReducer from "./signin";
import surveillanceReducer from "./livesurveillance";
import threatsReducer from "./threats";


const rootReducer = combineReducers({
  signupReducer : signupReducer,
  signinReducer : signinReducer,
  surveillanceReducer : surveillanceReducer,
  threatsReducer : threatsReducer,
  form: formReducer
});

export default rootReducer;
