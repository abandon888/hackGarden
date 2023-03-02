import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { observer } from 'mobx-react-lite'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../store'
import { useEffect } from 'react'
// import LoginStore from '@/store/login.Store'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const { pathname } = useLocation()
  const { LoginStore } = useStore()
  const { userStore } = useStore()
  useEffect(() => {
    try {
      useStore.getUserInfo()
    } catch { }
  }, [userStore])
  // 排个bug排了这么久，离谱
  const navigate = useNavigate()
  const onConfirm = () => {
    LoginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            //高亮原理defaultSelectedKeys===目标item key
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            //加上defaultSelectedKeys和selectedKeys后前进后退都能跳转了
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              {/* 加上了link后就能在地址栏显示页面的不同了 */}
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)