//文章相关Api接口
import {request} from "@/utils";

// 获取频道列表
function getChannelListApi() {
    return request({
        url:'/channels',
    })
}
// 发布文章接口
function publishArticleApi(params) {
    return request({
        url:'/mp/articles?draft=false',
        method:'POST',
        data:params
    })
}
// 获取文章列表接口
function getArticleListApi(params) {
    return request({
        url:'/mp/articles',
        params
    })
}
// 删除文章接口
function deleteArticleApi(id) {
    return request({
        url:`/mp/articles/${id}`,
        method:'DELETE'
    })
}
// 获取文章详情接口
function getArticleDetailApi(id) {
    return request({
        url:`/mp/articles/${id}`
    })
}
// 修改文章接口
function updateArticleApi(id,params) {
    return request({
        url:`/mp/articles/${id}`,
        method:'PUT',
        data:params
    })
}

export {
    getChannelListApi,
    publishArticleApi,
    getArticleListApi,
    deleteArticleApi,
    getArticleDetailApi,
    updateArticleApi
}
