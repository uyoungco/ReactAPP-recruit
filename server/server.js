const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')


const app = express()

// work with express 
// 吧socket.io 和 HTTP的接口统一起来
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
	// console.log('user login')
	socket.on('sendmsg', function(data) {
		console.log(data)
		const { from, to, msg } = data
		const chatid = [from, to].sort().join('_')
		Chat.create({ chatid, from, to, content:msg}, function(err, doc) {
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
		// console.log(data)
		// io.emit('recvmsg', data)
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
