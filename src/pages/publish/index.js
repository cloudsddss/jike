import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select, message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import { useEffect, useState } from 'react'
import {getChannelListApi, publishArticleApi} from "@/apis/artical";
const { Option } = Select

const Publish = () => {
    const [form] = Form.useForm()
    const [editor, setEditor] = useState(null)
    const [html, setHtml] = useState('')
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
    // 上传图片
    const [images, setImages] = useState([])
    const onUploadChange = ({fileList}) => {
        console.log(fileList)
        // const image=fileList.map(file=>file.response.data.url)
        setImages(fileList)
    }
    //模式选中
    const [imageType, setimageType] = useState(0)
    const getType = (e) => {
        setimageType(e.target.value)
    }
    //表单提交
    const onFinish =  async (values) => {
        const imageUrls = images.map(file => file.response.data.url)
        console.log(imageUrls)
        if(imageType!==images.length)
            return message.error('封面图片数量与选择的模式不符')
        const { channel_id, content, title } = values
        const params = {
            channel_id,
            content,
            title,
            cover: {
                type: imageType,
                images: imageUrls
            }
        }
        const res = await publishArticleApi(params)
        console.log( res)

    }
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type:imageType }}
                    validateTrigger={['onBlur']}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题!' }]}

                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={getType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/*
                        listType: picture-card 以图片卡片的形式展示上传列表
                        showUploadList: 是否展示上传列表
                        */}
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name="image"
                            onChange={onUploadChange}
                            // 限制上传数量，根据imageType的值来限制
                            maxCount={imageType}
                            visible={imageType > 0}
                        >
                            {images.length<imageType&&
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>}
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {
                                channelList.map(item=>
                                    <Option value={item.id} key={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <div style={{ border: '1px solid #d9d9d9' }}>
                        <Toolbar editor={editor} mode="default" style={{ borderBottom: '1px solid #d9d9d9' }} />
                        <Editor    value={html}    onCreated={setEditor}    onChange={(editorInstance) => {
                            const value = editorInstance.getHtml()
                            setHtml(value)
                            form.setFieldValue('content', value)
                        }}    placeholder="请输入文章内容"    mode="default"    style={{ height: 300, overflowY: 'hidden' }}  />
                        </div>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit" >
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish
