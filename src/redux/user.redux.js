import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo:'', // 登录成功应该跳转到那个地方
  msg:'', //当前有没有报错信息
  isAuth: false, // 是否已经登录
  user:'',
  type:''
}
// reducers
export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
    case LOGIN_SUCCESS:
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }

}

function registerSuccess(data) {
  return { type:REGISTER_SUCCESS, payload:data}
}
function errorMsg(msg) {
  return { type:ERROR_MSG, msg:msg}
}
function loginSuccess(data) {
  return { type:LOGIN_SUCCESS, payload:data}
}

// 登录后redux获取信息
export function loadData(data) {
  return { type:LOAD_DATA, payload:data}
}

export function login({user,pwd}) {
  if (!user||!pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch=>{
    axios.post('/user/login', {user,pwd}).then(res=>{
      if (res.status == 200 && res.data.code === 0) {
        // dispatch(registerSuccess({user,pwd,type}))
        dispatch(loginSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}


// 注册提交
export function regisger({user, pwd, repeatpwd, type}) {
  if (!user||!pwd||!type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd!==repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch=>{
    axios.post('/user/register', {user,pwd,type}).then(res=>{
      if (res.status == 200 && res.data.code === 0) {
        dispatch(registerSuccess({user,pwd,type}))

      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
