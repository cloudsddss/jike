import userReducer from "./modules/index";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})
export default store
