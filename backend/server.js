// 필요한 모듈을 가져오기
const express = require("express");
const bodyParser = require('body-parser');


//const mongoose = require('./db');
//const model = require('./model');

const app = express();
//connection from db here
app.use(bodyParser.json());

const mongoose = require("mongoose");
const { isError } = require("lodash");
// db 접근하기(UserLogDB)
mongoose
  .connect('mongodb://mongo:27017/UserLogDB',{
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(()=>{
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  })

//스키마 작성
var userLog = mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date
});

var room = mongoose.Schema({
  hmRoomID: String,
  owtRoomID: String,
  roomName: String,
  participantLimit: Number,
  hasPassword: Boolean,
  isLimited: Boolean,
  leaderJoined: Boolean
});

var user = mongoose.Schema({
  owtID: String,
  name: String,
  joinedAt: Number,
  camStatus: Boolean,
  micStatus: Boolean,
  roomID: String
});

// 모델 정의
var userLogModel = mongoose.model("UserLog", userLog);
var roomModel = mongoose.model("Room", room);
var userModel = mongoose.model("User", user);

// 모델 삭제
userLogModel.remove()
  .then(() => {
    console.log('userLogModel collection 삭제')
  })
  .catch((err) => {
    console.log("Error : ", err);
  })
roomModel.remove()
  .then(() => {
    console.log('userLogModel collection 삭제')
  })
  .catch((err) => {
    console.log("Error : ", err);
  })
userModel.remove()
  .then(() => {
    console.log('userLogModel collection 삭제')
  })
  .catch((err) => {
    console.log("Error : ", err);
  })

  // data 삽입
const test = new userLogModel({name: 'sunghyeon', startTime: '2020-12-29T13:35:50Z', endTime: '2020-12-29T13:50:50Z'});
const test1 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-28T13:35:50Z', endTime: '2020-12-28T16:50:50Z'});
const test2 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-27T10:35:50Z', endTime: '2020-12-27T12:50:50Z'});
const test3 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-26T10:35:50Z', endTime: '2020-12-26T13:50:50Z'});
const test4 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-25T15:35:50Z', endTime: '2020-12-25T16:50:50Z'});
const test5 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-24T09:35:50Z', endTime: '2020-12-24T12:50:50Z'});
const test6 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-23T13:35:50Z', endTime: '2020-12-23T13:50:50Z'});
const test7 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-22T13:50:50Z', endTime: '2020-12-22T16:50:50Z'});
const test8 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-21T11:50:50Z', endTime: '2020-12-21T12:50:50Z'});
const test9 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-20T12:35:50Z', endTime: '2020-12-20T13:50:50Z'});
const test10 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-19T13:35:50Z', endTime: '2020-12-19T16:50:50Z'});
const test11 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-18T10:35:50Z', endTime: '2020-12-18T12:50:50Z'});
const test12 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-17T12:35:50Z', endTime: '2020-12-17T13:50:50Z'});
const test13 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-16T14:35:50Z', endTime: '2020-12-16T16:50:50Z'});
const test14 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-15T11:35:50Z', endTime: '2020-12-15T12:50:50Z'});
const test15 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-14T11:35:50Z', endTime: '2020-12-14T13:50:50Z'});
const test16 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-13T13:35:50Z', endTime: '2020-12-13T16:50:50Z'});
const test17 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-12T10:35:50Z', endTime: '2020-12-12T12:50:50Z'});
const test18 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-11T13:35:50Z', endTime: '2020-12-11T13:50:50Z'});
const test19 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-10T13:35:50Z', endTime: '2020-12-10T16:50:50Z'});
const test20 = new userLogModel({name: 'sunghyeon', startTime: '2020-12-09T10:35:50Z', endTime: '2020-12-09T12:50:50Z'});
const test21 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-08T10:35:50Z', endTime: '2020-12-08T13:50:50Z'});
const test22 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-07T15:35:50Z', endTime: '2020-12-07T16:50:50Z'});
const test23 = new userLogModel({name: 'hyeonsung', startTime: '2020-12-06T11:35:50Z', endTime: '2020-12-06T12:50:50Z'});

const test24 = new roomModel({hmRoomID: '123-456-7890', owtRoomID:'abcdefg1', roomName: 'room1', participantLimit: 50, startedAt: 1609908599000});
const test25 = new roomModel({hmRoomID: '123-456-7891', owtRoomID:'abcdefg2', roomName: 'room2', participantLimit: 50, startedAt: 1609908599000});
const test26 = new roomModel({hmRoomID: '123-456-7892', owtRoomID:'abcdefg3', roomName: 'room3', participantLimit: 50, startedAt: 1609908599000});
const test27 = new roomModel({hmRoomID: '123-456-7893', owtRoomID:'abcdefg4', roomName: 'room4', participantLimit: 50, startedAt: 1609908599000});
const test28 = new roomModel({hmRoomID: '123-456-7894', owtRoomID:'abcdefg5', roomName: 'room5', participantLimit: 50, startedAt: 1609908599000});

const test29 = new userModel({owtID: 'cdefg1', name: '티맥스', joinedAt: 1609387656412, roomID: '123-456-7890', camStatus: false, micStatus: false});
const test30 = new userModel({owtID: 'cdefg2', name: '티베로', joinedAt: 1609387656422, roomID: '123-456-7890', camStatus: false, micStatus: false});
const test31 = new userModel({owtID: 'cdefg3', name: '티미팅', joinedAt: 1609387656435, roomID: '123-456-7890', camStatus: false, micStatus: false});
const test32 = new userModel({owtID: 'cdefg4', name: '티스페', joinedAt: 1609387656440, roomID: '123-456-7890', camStatus: false, micStatus: false});
const test33 = new userModel({owtID: 'cdefg5', name: '티우스', joinedAt: 1609387656460, roomID: '123-456-7890', camStatus: false, micStatus: false});
const test34 = new userModel({owtID: 'cdefg6', name: '티볼리', joinedAt: 1609387656480, roomID: '123-456-7891', camStatus: false, micStatus: false});
const test35 = new userModel({owtID: 'cdefg7', name: '티밍이', joinedAt: 1609387656490, roomID: '123-456-7891', camStatus: false, micStatus: false});
const test36 = new userModel({owtID: 'cdefg8', name: '티라노', joinedAt: 1609387656590, roomID: '123-456-7892', camStatus: false, micStatus: false});
const test37 = new userModel({owtID: 'cdefg9', name: '티검불', joinedAt: 1609387656690, roomID: '123-456-7893', camStatus: false, micStatus: false});
const test38 = new userModel({owtID: 'cdefg10', name: '티그리', joinedAt: 1609387656790, roomID: '123-456-7894', camStatus: false, micStatus: false});

userLogModel.insertMany([test,test1,test2,test3,test4,test5,test6,test7,test8,test9,test10,test11,test12,test13,test14,test15,test16,test17,test18,test19,test20,test21,test22,test23])
  .then(() => {
    console.log("userLogModel Complete")
  })
  .catch((err) =>{
    console.log("userLogModel error : "+err)
  })
roomModel.insertMany([test24,test25,test26,test27,test28])
  .then(() => {
    console.log("roomModel Complete")
  })
  .catch((err) =>{
    console.log("roomModel error : "+err)
  })
userModel.insertMany([test29,test30,test31,test32,test33,test34,test35,test36,test37,test38])
  .then(() => {
    console.log("userModel Complete")
  })
  .catch((err) =>{
    console.log("userModel error : "+err)
  })



//DB lists 테이블에 있는 모든 데이터를 가져오기
app.get('/api/log', (req, res) => {
  userLogModel.find((err, logs) => {
    if(err){
      return res.status(500).send(err);
    }else{
      return res.json(logs);      
    }
  });
})

app.get('/api/log/:name', (req, res) => {
  userLogModel.find({'name':req.params.name}, (err, logs) => {
    if(err){
      return res.status(500).send(err);
    }else{
      return res.json(logs);      
    }
  });
})

app.get('/api/room', (req, res) => {
  roomModel.find((err, logs) => {
    if(err){
      return res.status(500).send(err);
    }else{
      return res.json(logs);      
    }
  });
})

app.get('/api/room/:roomID/users', (req, res) => {
  userModel.find({'roomID':req.params.roomID}, (err, logs) => {
    if(err){
      return res.status(500).send(err);
    }else{
      console.log("users", res);
      return res.json({success:true, users:logs});      
    }
  });
})

//클라이언트에서 입력한 값을 데이터 베이스 lists 에 삽입하기
app.post('/api/value', function(req, res, next){
  // 데이터 베이스에서 값 넣어주기
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      if (err)
        return res.status(500).send(err)
      else
        return res.json({success:true, value:req.body.value})
    }    )
})

app.listen(5000, () =>{
  console.log('애플리케이션 5000 포트에서 시작')
})
