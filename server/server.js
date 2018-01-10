const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

// work with express 
// 吧socket.io 和 HTTP的接口统一起来
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
	// console.log('user login')
	socket.on('sendmsg', function(data) {
		console.log(data)
		io.emit('recvmsg', data)
	})
})



const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())


app.use('/user', userRouter)
//新建app
app.get('/',function(req,res){
	res.send('<h1>Hello word</h1>')
})



server.listen(9093, function(){
	console.log('Node app start at port 9093')
})
