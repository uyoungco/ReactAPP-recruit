const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())


app.use('/user', userRouter)
//新建app
app.get('/',function(req,res){
  res.send('<h1>Hello word</h1>')
})



app.listen(9093, function(){
  console.log('Node app start at port 9093')
})
