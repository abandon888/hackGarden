import { useEffect, useRef, useState } from 'react'
// import CartoonImage from '../../assets/cartoon.jpg'
// import LifeImage from '../../assets/life.jpg'
// import FoodImage from '../../assets/food.jpg'
// import LogoImage from '../../assets/logo.png'
import './index.css'
// import { useLogin } from '../login/LoginStore'

import styles from './styles.module.scss'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'
import {
  Button,
  Form,
  Input,
  List,
  Popup,
  Space,
  TextArea,
  Image,
  Dialog,
  Selector,
} from 'antd-mobile'
import { useStore } from 'C:/Users/18767/Desktop/成熟项目/webtodo（登录）/src/components/store'
import { observer } from 'mobx-react-lite'
import { message } from 'antd'

const TAB_HEIGHT = 56

// 1. 点击 Tab 滚动跳转 x
// 3. Tabs 吸顶 x
// 2. 滚动时，高亮 Tab x
// 4. 按钮吸底

//使用弹窗
window.onload = function () {
  Dialog.alert({
    content: '人在天边月上明',
    onConfirm: () => {
      console.log('Confirmed')
    },
  })
}
// function ImageCarousel(props) {
//   // 使用 useRef 获取组件 DOM 元素
//   const carouselRef = useRef(null);
//   // 使用 useRef 初始化 lastTouchY 变量
//   const lastTouchY = useRef(0);
//   // 使用 useState 维护状态
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     // 绑定手指上下滑动事件
//     carouselRef.current.addEventListener('touchmove', handleTouchMove);
//     // 返回清理函数，在组件卸载时取消事件绑定
//     return () =>
//       carouselRef.current.removeEventListener('touchmove', handleTouchMove);
//   }, []);

//   function handleTouchMove(event) {
//     // 获取手指的滑动方向
//     const direction = event.touches[0].clientY - lastTouchY.current;
//     lastTouchY.current = event.touches[0].clientY;

//     // 根据方向切换图片
//     if (direction > 0) {
//       // 向下滑动，切换到上一张图片
//       setCurrentImageIndex(
//         (currentImageIndex - 1 + props.images.length) % props.images.length
//       );
//     } else {
//       // 向上滑动，切换到下一张图片
//       setCurrentImageIndex((currentImageIndex + 1) % props.images.length);
//     }
//   }

//   return (
//     <div ref={carouselRef}>
//       <img src={props.images[currentImageIndex]} />
//     </div>
//   );
// }
const SecondSection = () => {
  // const { loginStore } = useLogin()
  const { taskStore } = useStore()
  const [activeTab, setActiveTab] = useState('搞定mobx')
  const [isFixed, setIsFixed] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const secondSectionRef = useRef(null)
  //删除
  function delTask (id) {
    taskStore.delTask(id)
  }
  //提交后处理
  const onFinish = (values) => {
    console.log(values)
    console.log(values.address)
    console.log(values.name + '的nomb')
    taskStore.addTask({
      id: uuid(),
      name: values.name + '的nomb',
      address: values.address,
    })
  }
  // 登录处理
  async function onLoginIn (values) {
    console.log(values)
    // await loginStore.getToken({
    //   mobile: values.username,
    //   code: values.password,
    // })
    message.success('登录成功')
  }
  const activate = (key) => {
    setActiveTab(key)

    const tabContentEl = document.querySelector(`[data-id=${key}]`)

    if (tabContentEl) {
      tabContentEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onScroll = () => {
    if (secondSectionRef.current) {
      const { top } = secondSectionRef.current.getBoundingClientRect()
      setIsFixed(top <= 0)

      const sectionNodes = secondSectionRef.current.querySelectorAll('section')

      Array.from(sectionNodes).forEach((sectionEl) => {
        const { top } = sectionEl.getBoundingClientRect()
        const key = sectionEl.getAttribute('data-id') || ''

        if (top <= TAB_HEIGHT) {
          setActiveTab(key)
        }
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <div className={styles.secondSection} ref={secondSectionRef}>
      {/* Tabs */}
      <ul className={classNames({ [styles.isFixed]: isFixed })}>
        {taskStore.list.map((item) => (
          <li key={item.id} onClick={() => activate(item.name)}>
            <span>{item.name}</span>
            <span
              className={classNames(styles.line, {
                [styles.visible]: activeTab === item.name,
              })}
            />
          </li>
        ))}
        <Button
          color="primary"
          onClick={() => {
            setVisible1(true)
          }}>
          创建你的tomb
        </Button>
        {/* 弹出层 */}
        <Popup
          visible={visible1}
          onMaskClick={() => {
            setVisible1(false)
          }}
          bodyStyle={{ height: '60vh' }}>
          <div style={{ padding: '24px' }}>
            <Space direction="vertical">
              <div>这是弹出层1</div>
              <Form
                onFinish={onFinish}
                layout="horizontal"
                footer={
                  <Button block type="submit" color="primary" size="large">
                    提交
                  </Button>
                }>
                <Form.Header>水平布局表单</Form.Header>
                <Form.Item
                  name="name"
                  label="姓名"
                  rules={[{ required: true, message: '姓名不能为空' }]}>
                  <Input placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item name="address" label="地址" help="详情地址">
                  <TextArea
                    placeholder="请输入地址"
                    maxLength={100}
                    rows={2}
                    showCount
                  />
                </Form.Item>
                <Form.Item name="style" label="样式" required>
                  <Selector
                    options={[
                      {
                        label: '选项一',
                        description: '描述信息',
                        value: 'yes',
                      },
                      {
                        label: '选项二',
                        description: '描述信息',
                        value: 'no',
                      },
                    ]}
                  />
                </Form.Item>
              </Form>
            </Space>
          </div>
        </Popup>
      </ul>
      {/* <ul className={classNames({ [styles.isFixed]: isFixed })}>
        {tabs.map((tab) => (
          <li key={tab.key} onClick={() => activate(tab.key)}>
            <span>{tab.title}</span>
            <span
              className={classNames(styles.line, {
                [styles.visible]: activeTab === tab.key,
              })}
            />
          </li>
        ))}
      </ul> */}

      {/* 类名标识 */}
      <List header="墓碑列表">
        {taskStore.list.map((item) => (
          <section data-id={item.id}>
            <List.Item
              extra={
                <Button
                  color="primary"
                  onClick={() =>
                    Dialog.confirm({
                      content: '确定要删除吗？',
                      onConfirm: () => delTask(item.id),
                    })
                  }>
                  删除
                </Button>
              }>
              {item.address}
              {item.name}
            </List.Item>

          </section>
          // <li className="todo" >
          //   <div className="view">
          //     <label>{item.name}</label>
          //     <label>{item.address}</label>
          //   </div>
          // </li>
        ))}
      </List>
      {/* <div>
        {taskStore.list.map((item) => (
          <section data-id={.key}>
            <h2>{tab.title}</h2>
            <img src={tab.image} alt={tab.key} />
          </section>
        ))}
      </div> */}

      {/* 吸底按钮 */}
      <div
        className={classNames(styles.btnWrapper, {
          [styles.visible]: isFixed,
        })}>
        {/* <img src={LogoImage} alt="LOGO" /> */}
        {/* 弹出层按钮 */}
        <Button
          onClick={() => {
            setVisible2(true)
          }}>
          登录
        </Button>
        <Popup
          visible={visible2}
          onMaskClick={() => {
            setVisible2(false)
          }}
          bodyStyle={{ height: '40vh' }}
          onClose={() => {
            setVisible2(false)
          }}>
          <Form
            layout="vertical"
            onFinish={onLoginIn}
            footer={
              <Button block type="submit" color="primary" size="large">
                提交
              </Button>
            }>
            <Form.Item label="用户名" name="username">
              <Input placeholder="请输入用户名" clearable />
            </Form.Item>
            <Form.Item label="密码" name="password">
              <Input placeholder="请输入密码" clearable type="password" />
            </Form.Item>
          </Form>
        </Popup>
      </div>
    </div>
  )
}

export default observer(SecondSection)
