import { combineReducers } from "@reduxjs/toolkit";

import mailReducer from "./reducers/mailReducer";
import userReducer from "./reducers/userReducer";
import messageReducer from "./reducers/messageReducer";

const rootReducer = combineReducers({
    mail: mailReducer,
    user: userReducer,
    message:messageReducer
})

export default rootReducer