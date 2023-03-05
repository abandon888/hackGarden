import { Link } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
} from 'antd'
//import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '../../assets/error.png'
//import './index.scss'
import { useState, useEffect } from 'react'
import { http } from '../../utils'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  //频道列表管理
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const loadChannelList = async () => {
      const res = await http.get('/channels')
      setChannelList(res.data.channels)
    }
    loadChannelList()
  }, [])
  //文章列表管理 统一管理数据 将来修改给setList传对象
  const [list, setList] = useState({
    list: [], //文章列表
    count: 0, //文章数量
  })

  //文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  })
  //如果异步请求函数需要依赖一些数据变化而重新执行，推荐写到内部
  //统一不抽离函数到外面，只要涉及到异步请求的函数 都放到useEffect内部
  //本质区别：写到useEffect外面每次组件更新都会执行，里面则只有依赖项发生变化时函数才会执行，避免性能损失
  useEffect(() => {
    const loadList = async () => {
      const res = http.get('/mp/article', { params })
      console.log(res)
    }
    loadList()
  }, [params])
  const onFinish = (value) => {
    console.log(value)
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (result) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (result) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      },
    },
  ]
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: ['http://geek.itheima.net/resources/images/15.jpg'],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案',
    },
  ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}>
        <Form onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {/* 遍历频道列表 */}
              {channelList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Article
