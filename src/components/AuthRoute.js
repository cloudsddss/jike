//封装高阶组件:判断是否有 token，有则返回组件，没有则返回登录组件


import {getToken} from "@/utils";
import {Navigate} from "react-router-dom";

/**
 * @param {*} Component 需要判断的组件
 * @returns React.JSX.Element
 * */
export function AuthRoute({ Component}){
    const token = getToken()
    if(token){
        // 有token,使用幽灵组件渲染组件
        return <Component />
    }
    else{
        // 无token,跳转到登录页面,replace: true,表示替换当前历史记录,而不是添加新的历史记录
        return <Navigate to="/login" replace={true} />
    }
}
