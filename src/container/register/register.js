import React from 'react';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import { regisger } from '../../redux/user.redux'

@connect(
  state=>state.user,
  {regisger}
)


class Register extends React.Component{
  constructor() {
    super()
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.regisger(this.state)
  
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <InputItem onChange = {v=>this.handleChange('user', v)}>用户名</InputItem>
          <InputItem onChange = {v=>this.handleChange('pwd', v)} type="password">密码</InputItem>
          <InputItem onChange = {v=>this.handleChange('repeatpwd', v)} type="password">确认密码</InputItem>
          <WhiteSpace />

          <RadioItem
            checked={this.state.type=='genius'}
            onChange = {()=>this.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
             checked={this.state.type=='boss'}
             onChange = {()=>this.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>

      </div>
    )
  }
}

export default Register
