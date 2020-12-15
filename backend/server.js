// 필요한 모듈을 가져오기
const express = require("express");
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

//테이블 생성하기
db.pool.query(`CREATE TABLE lists(
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`, (err, results, fields) => {
  console.log('results', results)
})

//DB lists 테이블에 있는 모든 데이터를 가져오기
app.get('/api/values', function(req, res) {
  // db에서 모든 정보를 가져오기
  db.pool.query(`SELECT * FROM lists;`,
    (err, results, fields) => {
      if(err)
        return res.status(500).send(err)
      else
        return res.json(results)
    })
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
