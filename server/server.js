import express from 'express'
// const express = require('express')
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'

import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
	extensions: ['png']
})

import React from 'react'
import {renderToString} from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'



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
	const store = createStore(reducers, compose(applyMiddleware(thunk)))
	let context = {}
	const markup = renderToString (
		(<Provider store={store} >
			<StaticRouter
				location = {req.url}
				context={context}
			>
				<App></App>
			</StaticRouter>
		  </Provider>)
	)
	const obj = {
		'/msg':'React聊天消息聊表',
		'/boss':'BOSS查看牛人列表'
	}
	const pageHtml = `
	<!DOCTYPE html>
	<html lang="zh-cn">
	  <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="theme-color" content="#000000">
		<title>React App</title>
		<link rel="stylesheet" href="/${staticPath['main.css']}">
		<meta name="description" content='${obj[req.url]}'>
	  </head>
	  <body>
		<noscript>
		  You need to enable JavaScript to run this app.
		</noscript>
		<div id="root">${markup}</div>
		<script src="/${staticPath['main.js']}"></script>
	  </body>
	</html>
`

	res.send(pageHtml)
	// console.log('path resolve',path.resolve('build/index.html'))
	// return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function(){
	console.log('Node app start at port 9093')
})