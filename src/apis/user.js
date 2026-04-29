//用户相关接口
import {request} from "@/utils";

function loginApi(loginForm) {
    return request({
        url:'/authorizations',
        method:'POST',
        data:loginForm
    })
}
function getUserInfoApi() {
    return request({
        url:'/user/profile',
    })
}

export {
    loginApi,
    getUserInfoApi
}
