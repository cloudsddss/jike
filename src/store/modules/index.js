import {createSlice} from "@reduxjs/toolkit";
import {getToken, removeToken, setToken} from "@/utils";
import {getUserInfoApi, loginApi} from "@/apis/user";

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
        },
        //清除 token和userInfo
        clearUserInfo:(state)=>{
            state.userInfo = {}
            state.token = ''
            removeToken()
        }
    }
})


const{setTokens,setUserInfo,clearUserInfo} = userStore.actions

const userReducer = userStore.reducer

//异步函数获取 token
const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
        const res = await loginApi(loginForm)
        dispatch(setTokens(res.data.token))
    }
}
//获取用户信息
const fetchUserInfo = ()=>{
    return async (dispatch)=>{
        const res = await getUserInfoApi()
        dispatch(setUserInfo(res.data))

    }
}

export
{
    fetchLogin,
    fetchUserInfo,
    clearUserInfo
}
export default userReducer
