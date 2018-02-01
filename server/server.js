import express from 'express'
// const express = require('express')
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'

import React from 'react'
import {renderToString,renderToStaticMarkup} from 'react-dom/server'
const Chat = model.getModel('chat')

const path = require('path')
const app = express()



// work with express 
// 吧socket.io 和 HTTP的接口统一起来
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
	// console.log('user login')
	socket.on('sendmsg', function(data) {
		// console.log(data)
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
// 1.购买域名
// 2.DNS解析到你的服务器
// 3.安装Nginx
// 4.使用pm2管理node进程
app.use('/user', userRouter)
app.use(function(req, res, next){
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}
	// console.log('path resolve',path.resolve('build/index.html'))
	return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function(){
	console.log('Node app start at port 9093')
})