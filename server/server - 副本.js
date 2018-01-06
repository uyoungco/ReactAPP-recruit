const express = require('express')
const mongoose = require('mongoose')
//链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log('mongo connect success')
})
//类似于mysql的表 mongo里有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String, require:true},
  age:{type:Number, require:true}
}))

//新增一个用户信息
// User.create({
//   user:'xiaoming',
//   age:15
// },function(err, doc){
//   if(!err) {
//     console.log(doc)
//   }else{
//     console.log(err)
//   }
// })

  //删除agr=18的对象
// User.remove({age:18},function(err, doc){
//   if(!err){
//     console.log('delete success')
//     User.find({},function(e, d){
//       console.log(d)
//     })
//   }else{
//     console.log(err)
//   }
// })


//更新
// User.update({'user':'xiaoming'},{'$set':{age:26}}, function(err, doc){
//   console.log(doc)
// })

//新建app
const app = express()
app.get('/',function(req,res){
  res.send('<h1>Hello word</h1>')
})

app.get('/data', function(req,res){
  User.find({}, function(err,doc){
    res.json(doc)
  })
})


app.listen(9093, function(){
  console.log('Node app start at port 9093')
})
