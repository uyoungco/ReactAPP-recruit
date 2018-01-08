import React from 'react';
import { connect } from 'react-redux'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import { getUserList } from '../../redux/chatuser.redux'

@connect(
    state => state.chatuser,
    { getUserList }
)

class Boss extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.getUserList('genius')
    }
    render() {
        console.log(this.props)
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace />
                {this.props.userlist.map(v => (
                    v.avatar ? <Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        ></Header>
                        <Body>
                            {v.desc.split('\n').map((v,k) => (
                                <div key={k}>{v}</div>
                            ))}
                        </Body>
                    </Card> : null
                ))}
            </WingBlank>
        )
    }
}


export default Boss