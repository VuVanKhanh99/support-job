import { combineReducers } from "redux";
import dataJobReducer from "./reducers/dataJob";
import reducerUser from "./reducers/userReducer";

const allReducer = combineReducers({
    userSlice: reducerUser, dataJob: dataJobReducer
})

export default allReducer