import React from 'react'
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types'


class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired   // 强类型
    }
    constructor() {
        super()
        this.state = {}
    }

    render() {
        // 引入所有头像图片的名称
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
                            .split(',')
                            .map(v => ({
                                icon:require(`../img/${v}.png`),
                                text:v
                            }))
        const gridHeader = this.state.icon 
                            ? (<div>
                                    <span>已选择头像</span>
                                    <img style={{width:20}} src={this.state.icon} alt={this.state.text}/>
                                </div>)
                            : '请选择头像'
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector