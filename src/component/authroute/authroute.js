import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@connect(
null,
  { loadData }
)
@withRouter

class AuthRoute extends React.Component {
  componentDidMount() {
    // 获取用户信息
    // 是否登录 现在的url地址  login不需要跳转的

    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname)>-1) {
      return null
    }
    axios.get('/user/info').then(res=>{
        if(res.status === 200){
          if(res.data.code === 0){
            // 有登录信息的
              this.props.loadData(res.data.data)
          }else{
            this.props.history.push('/login')
            //console.log(this.props.history)
          }
          console.log(res.data)
        }
      })
      // 用户的type 身份是Boss还是牛人
      // 用户是否完善信息
  }
  render() {
    return (
      null
    )
  }
}


export default AuthRoute
