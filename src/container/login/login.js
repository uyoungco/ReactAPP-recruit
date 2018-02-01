import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form'


// 理解高阶   函数当参数 或  参数当返回值
// function hello() {
//   console.log('hello imooc I love React')
// }

// function WrapperHello(fn) {
//   return function() {
//     console.log('before say hello')
//     fn()
//     console.log('after say hello')
//   }
// }

// hello = WrapperHello(hello)
// hello()

// 高阶组件有俩个功能 属性代理和反向继承

// 下面是属性代理
// function WrapperHello(Comp) {
// 	class WrappComp extends Comp {
// 		componentDidMount() {
// 			console.log('高阶组件新增的生命周期，加载完成')
// 		}
// 		render() {
// 			return <Comp></Comp>
// 		}
// 	}
// 	// class WrappComp extends React.Component {
// 	// 	render() {
// 	// 		return (
// 	// 			<div>
// 	// 				<p>这是HOC高阶组件特有的元素</p>
// 	// 				<Comp {...this.props} />
// 	// 			</div>
// 	// 		)
// 	// 	}
// 	// }
// 	return WrappComp
// }

// @WrapperHello
// class Hello extends React.Component {
//   render() {
//     return <h2>hello imooc I love React and redux</h2>
//   }
// }



@connect(
  state=>state.user,
  { login }
)
@imoocFrom
class Login extends React.Component{
  constructor(){
    super()
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }


  handleLogin(){
	  this.props.login(this.props.state)
  }


  register(){
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem onChange = {v=>this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace />
					<InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}


// const mapStateToProps = (state, ownProps) => {
//   return {
//     todos: state.user
//   }
// }
// const actionCreators = { login }
// Login = connect(mapStateToProps, actionCreators)(Login)

export default Login
