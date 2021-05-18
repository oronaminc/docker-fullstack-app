import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {Button, Modal, Table, Col, Row, Pagination} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Example from './Example';



function App() {

  useEffect(() => {
    let getRoomUrl = "http://localhost:3001/hmRoom/rooms";
    let getGraphUrl = 'http://localhost:3001/log/graph';
    let getRoomLogUrl = `http://localhost:3001/log/rooms/2021-01-01/2021-05-21?limit=5&offset=0`;
    let getTotalRoomLogUrl = `http://localhost:3001/log/rooms/2021-01-01/2021-05-21`;
    const requestRoom = axios.get(getRoomUrl);
    const requestGraph = axios.get(getGraphUrl);
    const requestRoomLog = axios.get(getRoomLogUrl);
    const requestTotal = axios.get(getTotalRoomLogUrl);

    axios
      .all([requestRoom, requestGraph, requestRoomLog, requestTotal])
      .then(axios.spread((...res) =>{
        setRoom(res[0].data);
        let temp2 = [];
          res[1].data.map((list, index) => (
            temp2.push({date:(new Date(list.Date)).toISOString(), close:list.Usage})
          ))
        setGraph(temp2);
        setRoomLogs(res[2].data);
        setTotal(res[3].data.length);
        let temp = []
        for (let number = 1; number <= parseInt((res[3].data.length-1)/5 + 1, 10); number++) {
          temp.push(
            <Pagination.Item key={number} active={number === active}>
              {number}
            </Pagination.Item>,
          );
        }
        setItems(temp);
      }))
      .catch(err => {
      })   

  }, []);
  
  const [room, setRoom] = useState([]);
  const [infos, setInfos] = useState([]);
  const [infos2, setInfos2] = useState([]);
  const [graph, setGraph] = useState([]);
  const [roomLogs, setRoomLogs] = useState([]);
  const [roomID, setValue] = useState("")
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2021-01-01'));
  const [endDate, setEndDate] = useState(new Date('2021-05-21'));
  const [active, setActive] = useState(1);
  const [items, setItems] = useState([]);
  const [totalCount, setTotal] = useState(0);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = (event) => {
    setShow(true);
    event.preventDefault();
    setValue(event.currentTarget.id);
    axios.get("http://localhost:3001/hmRoom/room/"+event.currentTarget.id+'/users')
      .then(res =>{
        if (res.status === 200) {
          setInfos(res.data);
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
          setInfos2(res.data);
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }        
      })
  }

  const handleShow3 = (event) => {
    const startDateYMD = startDate.getFullYear()+'-'+(startDate.getMonth() + 1).toString().padStart(2,'0')+'-'+startDate.getDate().toString().padStart(2,'0');
    const endDateYMD = endDate.getFullYear()+'-'+(endDate.getMonth() + 1).toString().padStart(2,'0')+'-'+endDate.getDate().toString().padStart(2,'0');
    event.preventDefault();
    axios.get(`http://localhost:3001/log/rooms/${startDateYMD}/${endDateYMD}`)
      .then(res => {
        if (res.status === 200){
          setTotal(res.data.length);
          setActive(1);
          let temp2 = [];
          let pageNum = 1;
          for (let number = 1; number <= (res.data.length-1)/5 + 1; number++) {
            temp2.push(
              <Pagination.Item key={number} active={number === pageNum}>
                {number}
              </Pagination.Item>,
            );
          }
          setItems(temp2);
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }
      })
    axios.get("http://localhost:3001/log/rooms/"+startDateYMD+'/'+endDateYMD+'?limit=5&offset=0')
      .then(res => {
        if (res.status === 200) {
          setRoomLogs(res.data);
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.');
          setRoomLogs([]);
        }        
      })
      .catch((error) => {
        alert(error);
        setTotal(0);
        setRoomLogs([]);
        setActive(0);
        setItems([]);
      });
    
      axios.get(`http://localhost:3001/log/graph/${startDateYMD}/${endDateYMD}`)
      .then(res => {
        if (res.status === 200) {
          let temp = [];
          res.data.map((list, index) => (
            temp.push({date:(new Date(list.Date)).toISOString(), close:list.Usage})
          ))
          setGraph(temp);
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.');
        }        
      })
      .catch((error) => {
        alert(error);
      });
    
  }

  const handlePagination = (event) => {
    const startDateYMD = startDate.getFullYear()+'-'+(startDate.getMonth() + 1).toString().padStart(2,'0')+'-'+startDate.getDate().toString().padStart(2,'0');
    const endDateYMD = endDate.getFullYear()+'-'+(endDate.getMonth() + 1).toString().padStart(2,'0')+'-'+endDate.getDate().toString().padStart(2,'0');
    event.preventDefault();
    let pageNum = parseInt(event.target.text, 10);
    let temp2 = [];
    setActive(pageNum);
    for (let number = 1; number <= parseInt((totalCount-1)/5 + 1, 10); number++) {
      temp2.push(
        <Pagination.Item key={number} active={number === pageNum}>
          {number}
        </Pagination.Item>,
      );
    }
    setItems(temp2);

    axios.get('http://localhost:3001/log/rooms/'+startDateYMD+'/'+endDateYMD+'?limit=5&offset='+(pageNum-1)*5)
      .then(res =>{
        if (res.status === 200) {
          setRoomLogs(res.data);
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }        
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
          <div className="mx-auto">HMS 생성 되어있는 방</div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th></th>                
                <th>roomName</th>
                <th>hmRoomID</th>
                <th>owtRoomID</th>
                <th>capacity</th>
              </tr>
            </thead>
            <tbody>
              {room && room.map((list, index) => (
                <tr key={index} id={list.hmRoomID} onClick={handleShow}>                
                  <td><h5>{index+1}</h5></td>
                  <td><h5>{list.roomName}</h5></td>
                  <td><h5>{list.hmRoomID}</h5></td>
                  <td><h5>{list.owtRoomID}</h5></td>
                  <td><h5>{list.capacity}</h5></td>
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
                      <td><h5>{info.name}</h5></td>
                      <td><h5>{info.camStatus.toString()}</h5></td>
                      <td><h5>{info.micStatus.toString()}</h5></td>
                      <td><h5>{(new Date(info.joinedAt)).toISOString()}</h5></td>
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
            </Col>
          </Row>
          <Row className="float-right">
            방의 총 갯수:
            {totalCount}
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
                <th>isStableEnd</th>
              </tr>
            </thead>
            <tbody>
              {roomLogs && roomLogs.map((roomLog, index) => (                
                <tr key={index} id={roomLog.idx} onClick={handleShow2}>                
                  <td><h5>{index+1+5*(active-1)}</h5></td>
                  <td><h5>{roomLog.name}</h5></td>
                  <td><h5>{roomLog.hostName}</h5></td>
                  <td><h5>{roomLog.startedAt}</h5></td>
                  <td><h5>{roomLog.endedAt}</h5></td>
                  <td><h5>{roomLog.capacity}</h5></td>
                  <td><h5>{roomLog.isStableEnd === null?"":roomLog.isStableEnd === true?"true":"false"}</h5></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Pagination onClick={handlePagination}>{items}</Pagination>
          </div>
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
                      <td><h5>{info2.name}</h5></td>
                      <td><h5>{info2.joinedAt}</h5></td>
                      <td><h5>{info2.leftAt}</h5></td>
                      <td><h5>{info2.license}</h5></td>
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

          <div className="mx-auto">전체 미팅 통계</div>
          
          {
            graph !== [] && <Example width={1000} height={500} test={graph}/>
          }
          <br />
        </div>
        
        
      </header>
      
    </div>
  );
}

export default App;
