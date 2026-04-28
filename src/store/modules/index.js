import {createSlice} from "@reduxjs/toolkit";
import {request} from "@/utils/request";
import {getToken, setToken} from "@/utils";

const userStore =createSlice({
    name:'user',
    initialState:{
        token: getToken() || '',
        userInfo: {}
    },
    reducers:{
        setTokens:(state,action)=>{
            state.token = action.payload
            // 本地存储token
            setToken(action.payload)
        },
        setUserInfo:(state,action)=>{
            state.userInfo = action.payload
        }
    }
})


const{setTokens,setUserInfo} = userStore.actions

const userReducer = userStore.reducer

//异步函数获取 token
const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
        const res = await request.post('/authorizations',loginForm)
        dispatch(setTokens(res.data.token))
    }
}
//获取用户信息
const fetchUserInfo = ()=>{
    return async (dispatch)=>{
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))

    }
}

export
{
    fetchLogin,
    fetchUserInfo,
}
export default userReducer
