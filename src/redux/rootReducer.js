import { combineReducers } from "@reduxjs/toolkit";

import mailReducer from "./reducers/mailReducer";

const rootReducer = combineReducers({

    mail: mailReducer,
})

export default rootReducer