import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import { Redirect } from 'react-router-dom';

import { logoutSubit } from '../../redux/user.redux'


@connect(
    state=>state.user,
    { logoutSubit }
)

class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert

        alert('注销', 'Are you OK???', [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Ok', onPress: () => {
                    browserCookie.erase('userid');
                    this.props.logoutSubit()
                }}
            ]
        )
    }
    render() {
        console.log(this.props)
        const props = this.props
        const Item = List.Item
        const Brief = List.Item.Brief
        return props.user ? (
            <div>
                <Result
                    img={<img style={{width:50}} src={require(`../img/${props.avatar}.png`)} alt="用户头像"/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map((v,k)=>(
                            <Brief key={k}>{v}</Brief>
                        ))}
                        {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                        
                    </Item>
                </List>
                <WhiteSpace> </WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
                
            </div>
        ) : <Redirect to={props.redirectTo} />
    }
}


export default User