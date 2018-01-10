import React from 'react';
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client'
import { spawn } from 'child_process';

const socket = io('ws://localhost:9093')


class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            text:'',
            msg:[]
        }
    }
    componentDidMount() {
        socket.on('recvmsg', (data)=> {
            console.log(data)
            this.setState({
                msg:[...this.state.msg, data.text]
            })
        })
    }
    handleSubmit() {
        socket.emit('sendmsg', {text:this.state.text})
        this.setState({text:''})
    }
    render() {
        
        return (
            <div>
                {this.state.msg.map((v,k) => {
                    return <p key={k}>{v}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v =>{
                                this.setState({text:v})
                            }}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                        >信息</InputItem>
                    </List>
                </div>
            </div>
        )
    }
}


export default Chat