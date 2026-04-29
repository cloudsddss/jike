//axios 封装

import axios from 'axios'
import {message} from "antd";
// 避免与 `src/utils/index.js` 产生循环依赖，直接从 token 模块导入
import {getToken, removeToken} from "@/utils/token";
import router from "@/router";
//根域名配置
//超时
//请求拦截器
const request=axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout:5000
})
// 添加请求拦截器
request.interceptors.request.use((config)=> {

    const token=getToken()
    if(token)
    {
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
}, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const status = error.response?.status

    if (!status) {
        message.error('网络异常，请稍后重试')
        return Promise.reject(error)
    }
    if (status === 401) {
        message.error('登录状态无效，请重新登录')
        removeToken()
        router.navigate('/login')
    } else{
        message.error(error.response?.data?.message || `请求失败(${status})`)
    }
    return Promise.reject(error)
})

export { request}
