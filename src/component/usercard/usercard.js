import React from 'react';
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired   // 强类型
    }
    render() {
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
                            {v.type === 'boss' ? <div>公司：{v.company}<WhiteSpace /></div> : null}
                            
                            {v.desc.split('\n').map((data, index) => (
                                <div key={index}>{data}</div>
                            ))}
                            
                            {v.type === 'boss' ? <div><WhiteSpace />薪资：{v.money}</div> : null}
                        </Body>
                    </Card> : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard