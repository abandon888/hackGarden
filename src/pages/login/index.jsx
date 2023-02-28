import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useStore } from '../../store'

function Login() {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  async function onFinish(values) {
    console.log(values)
    //values:放置的是所以表单项中用户输入的内容
    await loginStore.getToken({
      mobile: values.username,
      code: values.password,
    })
    //跳转首页
    navigate('/', { replace: true })
    message.success('登录成功')
    //错误处理参见文档
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: true,
            password: '246810',
          }}
          onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入你的手机号!' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur',
              },
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入你的密码!' },
              {
                len: 6,
                message: '请输入6位密码',
                validateTrigger: 'onBlur',
              },
            ]}>
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
