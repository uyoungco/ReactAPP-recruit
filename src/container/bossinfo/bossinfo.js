import React  from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:''
        }
    }
    onChange(key, val) {
        this.setState({
            [key]:val
        })
    }

    render() {
        return (
            <div>
                <NavBar mode="dark">BOSS信息完善</NavBar>
                <AvatarSelector selectAvatar={(imgname)=>{
                    this.setState({
                        avatar: imgname
                    })
                }}></AvatarSelector>
                <InputItem onClick={(v) => this.onChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onClick={(v) => this.onChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onClick={(v) => this.onChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    title="职位要求"
                    rows={3}
                    autoHeight
                    onClick={(v) => this.onChange('desc', v)}
                >
                </TextareaItem>
                <Button type="primary">保存</Button>
            </div>
        )
    }
}

export default BossInfo