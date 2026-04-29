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

export {
    getChannelListApi,
    publishArticleApi
}
