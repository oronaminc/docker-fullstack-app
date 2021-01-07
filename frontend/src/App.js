import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Button, Modal, Table} from 'react-bootstrap';

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

    axios.get('/api/room')
      .then(res => {
        console.log("???");
        console.log(res.data);
        setLists(res.data);
      })
      
    
    

  }, [])
  
  const [lists, setLists] = useState([]);
  const [infos, setInfos] = useState([]);
  const [tests, setTests] = useState([]);
  const [roomID, setValue] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow(true);
    event.preventDefault();
    setValue(event.currentTarget.id);
    // axios.get('/api/room/'+event.currentTarget.id)
    console.log(">>", event.currentTarget.id);
    axios.get('/api/room/'+event.currentTarget.id+'/users')
      .then(res =>{
        if (res.data.success) {
          console.log(res.data.users);
          setInfos(res.data.users);
          // setLists([...lists, res.data])
          // setValue("");
        } else {
          alert('방의 인원을 불러오는데 실패했습니다.')
        }        
      })
  } 

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
                <th>hmRoomID</th>
                <th>owtRoomID</th>                
                <th>roomName</th>
                <th>participantLimit</th>
              </tr>
            </thead>
            <tbody>
              {lists && lists.map((list, index) => (
                <tr key={index} id={list.hmRoomID} onClick={handleShow}>                
                  <td>{index}</td>
                  <td>{list.hmRoomID}</td>
                  <td>{list.owtRoomID}</td>
                  <td>{list.roomName}</td>
                  <td>{list.participantLimit}</td>
                </tr>
              ))}
            </tbody>
            {/* <thead>
              <tr>
                <th></th>
                <th>roomId</th>
                <th>roomName</th>
                <th>participantCur</th>
                <th>participantLimit</th>
              </tr>
            </thead>
            <tbody>
              {lists && lists.map((list, index) => (
                <tr key={index} id={list.room_id} onClick={handleShow}>
                  <td>{index+1}</td>
                  <td>{list.room_id}</td>
                  <td>{list.room_name}</td>
                  <td>{list.room_inputLimit}</td>
                  <td>{list.room_participantLimit}</td>
                </tr>
              ))}              
            </tbody> */}
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>방 ID : {roomID}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>userName</th>
                    <th>joinTime</th>
                    <th>camStatus</th>
                    <th>micStatus</th>
                  </tr>
                </thead>
                <tbody>
                  {infos && infos.map((info, index) => (
                    <tr key={index}>
                      <td>{info.name}</td>
                      <td>{(new Date(info.joinedAt)).toISOString()}</td>
                      <td>{info.camStatus.toString()}</td>
                      <td>{info.micStatus.toString()}</td>
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
          <div>전체 미팅 통계</div>
          {
            tests !== [] && <Example width={1000} height={500} test={tests}/>
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
