import {createSlice} from "@reduxjs/toolkit";
import {request} from "@/utils/request";
import {getToken, setToken} from "@/utils";

const userStore =createSlice({
    name:'user',
    initialState:{
        token: getToken() || ''
    },
    reducers:{
        setTokens:(state,action)=>{
            state.token = action.payload
            // 本地存储token
            setToken(action.payload)
        }
    }
})


const{setTokens} = userStore.actions

const userReducer = userStore.reducer

//异步函数
const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
        const res = await request.post('/authorizations',loginForm)
        dispatch(setTokens(res.data.token))
    }
}

export
{
    fetchLogin
}
export default userReducer
