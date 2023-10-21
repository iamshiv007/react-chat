import { combineReducers } from "@reduxjs/toolkit";

import mailReducer from "./reducers/mailReducer";
import userReducer from "./reducers/userReducer";
import messageReducer from "./reducers/messageReducer";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
    mail: mailReducer,
    user: userReducer,
    message: messageReducer,
    users: usersReducer
})

export default rootReducer