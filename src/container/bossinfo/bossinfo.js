import React  from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'

// const mapStateProps = (state) => {
//     return { state.user }
// }
// const actionCreators = { updata }
// BossInfo = connect(mapStateProps, actionCreators)(BossInfo)

@connect(
    state => state.user,
    { update }
)

class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            company:'',
            money:'',
            desc:''
        }
    }
    onChange(key, val) {
        this.setState({
            [key]:val
        })
    }

    render() {
        const path = this.props.loaction.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">BOSS信息完善</NavBar>
                <AvatarSelector selectAvatar={(imgname)=>{
                    this.setState({
                        avatar: imgname
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    title="职位要求"
                    rows={3}
                    autoHeight
                    onChange={(v)=>this.onChange('desc',v)}
                >
                </TextareaItem>
                <Button type="primary" onClick={()=>this.props.update(this.state)}>保存</Button>
            </div>
        )
    }
}


export default BossInfo