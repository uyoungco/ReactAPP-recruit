
// 合并所有的 redux 并且返回
import { combineReducers } from 'redux';
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.reudx'


export default combineReducers({ user, chatuser, chat})
