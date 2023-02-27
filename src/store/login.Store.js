import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '@/utils'
//注意这几个在utils中的调用，这代码调用真离谱
class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  //请注意，geToken在utils中调用了，添加了请求拦截
  getToken = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    this.token = res.data.token
    //存入ls(localStorage)
    setToken(this.token)
  }
  LoginOut = () => {
    this.token = ''
    removeToken()
  }
}
export default LoginStore