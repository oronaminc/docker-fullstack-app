import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Button, Modal, Table, Form, Col, Row} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Example from './Example';



function App() {

  useEffect(() => {
    //여기서 데이터베이스에 있는 값을 가져온다.
    //let test = [];    
    // axios.get('/api/log')
    //   .then(response => {
    //     //console.log('response', response.data);
    //     response.data.map((list, index) => (
    //       test.push( {date: (new Date(list.startTime)).toISOString(), close:( (new Date(list.endTime)-new Date(list.startTime))/36000 ) })
    //     ))
        
    //     console.log("정제된 데이터 : ", test);
    //     setTests(test);
    //     setLists(response.data);
    //   })

    // axios.get('/api/room')
    //   .then(res => {
    //     setLists(res.data);
    //   })
    // let firstUrl = "/api/room";
    let firstUrl = "http://localhost:3001/hmRoom/rooms/";
    let secondUrl = "/api/log";
    let thirdUrl = "/api/log/users";
    let fourthUrl = "http://localhost:3001/log/rooms/";
    const requestFirst = axios.get(firstUrl);
    const requestSecond = axios.get(secondUrl);
    const requestThird = axios.get(thirdUrl);
    const requestForth = axios.get(fourthUrl);

    axios
      .all([requestFirst, requestSecond, requestThird, requestForth])
      .then(axios.spread((...res) =>{
        setLists(res[0].data);
        let temp = [];
        res[1].data.map((list, index) => (
          temp.push({date:(new Date(list.startTime)).toISOString(), close:parseInt((list.endTime-list.startTime)/3600)})
        ))
        setLogs(temp);
        setUsers(res[2].data);
        setRoomLogs(res[3].data);
      }))
      .catch(err => {
        console.log(err);
      })   

  }, [])
  
  const [lists, setLists] = useState([]);
  const [infos, setInfos] = useState([]);
  const [infos2, setInfos2] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomLogs, setRoomLogs] = useState([]);
  const [roomID, setValue] = useState("")
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = (event) => {
    setShow(true);
    event.preventDefault();
    setValue(event.currentTarget.id);
    // axios.get('/api/room/'+event.currentTarget.id)
    console.log(">>", event.currentTarget.id);
    axios.get("http://localhost:3001/hmRoom/room/"+event.currentTarget.id+'/users')
      .then(res =>{
        if (res.status === 200) {
          console.log(res.data);
          setInfos(res.data);
          //setInfos(res.data.users);
          // setLists([...lists, res.data])
          // setValue("");
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }        
      })
  }

  const handleShow2 = (event) => {
    setShow2(true);
    event.preventDefault();
    axios.get("http://localhost:3001/log/room/"+event.currentTarget.id+'/users')
      .then(res =>{
        if (res.status === 200) {
          console.log(res.data);
          setInfos2(res.data);
          // setRoomLogs(res[3].data);
          //setInfos(res.data.users);
          // setLists([...lists, res.data])
          // setValue("");
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }        
      })
  }

  const handleShow3 = (event) => {
    const startDateYMD = startDate.getFullYear()+'-'+(startDate.getMonth() + 1).toString().padStart(2,'0')+'-'+startDate.getDay().toString().padStart(2,'0');
    const endDateYMD = endDate.getFullYear()+'-'+(endDate.getMonth() + 1).toString().padStart(2,'0')+'-'+endDate.getDay().toString().padStart(2,'0');
    event.preventDefault();
    axios.get("http://localhost:3001/log/rooms/"+startDateYMD+'/'+endDateYMD)
      .then(res =>{
        if (res.status === 200) {
          console.log(res.data);
          setRoomLogs(res.data);
          // setInfos2(res.data);
          //setInfos(res.data.users);
          // setLists([...lists, res.data])
          // setValue("");
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }        
      })
  }

  const handleShow4 = (event) => {
    event.preventDefault();
    axios.get("http://localhost:3001/log/rooms")
      .then(res =>{
        if (res.status === 200) {
          console.log(res.data);
          setRoomLogs(res.data);
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }        
      })
  }


  const handleUser = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.value);
    axios.get('/api/log/'+event.currentTarget.value)
      .then(res =>{
        if (res.status === 200) {
          let temp = [];
          res.data.map((list, index) => (
            temp.push({date:(new Date(list.startTime)).toISOString(), close:parseInt((list.endTime-list.startTime)/3600)})
          ))
          setLogs(temp);
        } else {
          alert('개인의 미팅 기록을 불러오는데 실패했습니다.')
        }        
      })
      .catch(err => {
        console.log(err);
      })
  }

  const CustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {/* <Button varient="primary">Primary</Button> */}
          <div className="mx-auto">HMS 생성 되어있는 방</div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th></th>                
                <th>roomName</th>
                <th>hmRoomID</th>
                <th>owtRoomID</th>
                <th>participantLimit</th>
              </tr>
            </thead>
            <tbody>
              {lists && lists.map((list, index) => (
                <tr key={index} id={list.hmRoomID} onClick={handleShow}>                
                  <td>{index}</td>
                  <td>{list.roomName}</td>
                  <td>{list.hmRoomID}</td>
                  <td>{list.owtRoomID}</td>
                  <td>{list.participantLimit}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>방 ID : {roomID}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>userName</th>
                    <th>camStatus</th>
                    <th>micStatus</th>
                    <th>joinTime</th>
                  </tr>
                </thead>
                <tbody>
                  {infos && infos.map((info, index) => (
                    <tr key={index}>
                      <td>{info.name}</td>
                      <td>{info.camStatus.toString()}</td>
                      <td>{info.micStatus.toString()}</td>
                      <td>{(new Date(info.joinedAt)).toISOString()}</td>
                    </tr>
                  ))}              
                </tbody>
              </Table>              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="mx-auto">
          <Row>
            <Col>HMS LOG
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                customInput={<CustomInput />}
              />
              ~
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                customInput={<CustomInput />}
              />
              <Button variant="secondary" onClick={handleShow3}>
                검색하기
              </Button>
              <Button variant="secondary" onClick={handleShow4}>
                전체 보기
              </Button>
            </Col>
          </Row>
          </div>
          
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th></th>                
                <th>roomName</th>
                <th>hostName</th>
                <th>startedAt</th>
                <th>endedAt</th>
                <th>capacity</th>
              </tr>
            </thead>
            <tbody>
              {roomLogs && roomLogs.map((roomLog, index) => (
                <tr key={index} id={roomLog.idx} onClick={handleShow2}>                
                  <td>{index}</td>
                  <td>{roomLog.name}</td>
                  <td>{roomLog.hostName}</td>
                  <td>{roomLog.startedAt}</td>
                  <td>{roomLog.endedAt}</td>
                  <td>{roomLog.capacity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={show2} size="lg" onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>방 ID : </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>userName</th>
                    <th>joinedAt</th>
                    <th>leftAt</th>
                    <th>license</th>
                  </tr>
                </thead>
                <tbody>
                  {infos2 && infos2.map((info2, index) => (
                    <tr key={index}>
                      <td>{info2.name}</td>
                      <td>{info2.joinedAt}</td>
                      <td>{info2.leftAt}</td>
                      <td>{info2.license}</td>
                    </tr>
                  ))}              
                </tbody>
              </Table>              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose2}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Form>
            <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
            <Form.Label column sm="6">전체 미팅 통계</Form.Label>
              <Form.Label column sm="3">유저 선택 : </Form.Label>
              <Col sm="3">
                <Form.Control as="select" onChange={handleUser}>
                  <option value="">All</option>
                  {users && users.map((user, index) => (
                    <option value={user.name}>{user.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
          
          {
            logs !== [] && <Example width={1000} height={500} test={logs}/>
          }
          {/* {lists && lists.map((list, index) => (
            // <li key={index}>{list.name} {( (new Date(list.endTime) - new Date(list.startTime))/36000 ).toString()}분 {( (new Date(list.startTime)) ).toDateString()} </li>
            <li key={index}> {( (new Date(list.startTime)) ).toDateString()} / {( (new Date(list.endTime) - new Date(list.startTime))/36000 ).toString()}분</li>
          ))} */}
          <br />
        </div>
        
        
      </header>
      
    </div>
  );
}

export default App;
