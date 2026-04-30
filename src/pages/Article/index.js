import {Link, useNavigate} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm} from 'antd'
// 引入中文包 控制日期组件中文显示
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import {useChannels} from "@/hooks/useChannels";
import {deleteArticleApi, getArticleListApi} from "@/apis/artical";
import {useEffect, useState} from "react";

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const navigator = useNavigate()
    //枚举文章状态
    const statusObj = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="success">审核通过</Tag>,
    }
    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            //data的值为后端返回的数字
            //data==1 表示待审核
            //data==2 表示审核通过
            render: data => statusObj[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (

                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined /> }
                            onClick={() => navigator(`/publish?id=${data.id}`)}
                        />
                        <Popconfirm title="是否确认删除？" okText="删除" cancelText="取消" onConfirm={() => handleDelete(data)}>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    // 获取文章列表
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)

    //筛选功能
    const [filter, setFilter] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page:1,
        per_page:5,
    })
    //获取表单数据
    const getArticleList=(value)=>{
        console.log(value)
        //处理表单数据
        setFilter({
            ...filter,
            channel_id: value.channel_id,
            status: value.status,
            begin_pubdate: value.date[0] ? value.date[0].format('YYYY-MM-DD') : '',
            end_pubdate: value.date[1] ? value.date[1].format('YYYY-MM-DD') : '',
        })

    }
    useEffect(() => {
        async function getList() {
            const res = await getArticleListApi(
                filter
            )
            setList(res.data.results)
            setTotal(res.data.total_count)
        }
        getList().then(r =>
            console.log(r)
        )
    }, [filter]);
    const onPageChange = (page) => {
        setFilter({ ...filter, page })
        console.log(page)
    }
    //删除功能
    const handleDelete = async (record) => {
        await deleteArticleApi(record.id)
        // 删除成功后，重新获取文章列表
        setFilter({ ...filter, page: 1 }) // 重置到第一页，触发useEffect重新获取数据
    }


    const { channelList } = useChannels()

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }}  onFinish={getArticleList}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id" >
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {
                                channelList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/*  表格区域   */}
            <Card title={`根据筛选条件共查询到 ${total} 条结果：`}>

                    <Table rowKey="id" columns={columns} dataSource={list}
                           pagination={{
                               total,
                               current: filter.page,
                               pageSize: filter.per_page,
                               onChange: onPageChange
                           }}
                    />
            </Card>
        </div>
    )
}

export default Article
