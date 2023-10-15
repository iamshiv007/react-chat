import { combineReducers } from "@reduxjs/toolkit";

import mailReducer from "./reducers/mailReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    mail: mailReducer,
    user: userReducer
})

export default rootReducer