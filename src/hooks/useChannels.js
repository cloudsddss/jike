//封装获取频道列表的方法


import {useEffect, useState} from "react";
import {getChannelListApi} from "@/apis/artical";

function useChannels(){
    // 获取频道列表
    const [channelList, setChannelList] = useState([])
    useEffect(()=>{
        async function getChannelList() {
            const res = await getChannelListApi()
            setChannelList(res.data.channels)
        }
        getChannelList().then(r =>
            console.log(r)
        )
    }, [])
    return {channelList}
}

export {useChannels}
