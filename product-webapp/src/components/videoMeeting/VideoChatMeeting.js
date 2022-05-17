// import { Tooltip } from "@material-ui/core";
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import { Button, TextField } from "@mui/material";
// import { red } from "@mui/material/colors";
// import React, { useContext, useEffect, useState } from "react";
// import { Col, Modal, Row } from 'react-bootstrap';
// import { SocketContext } from '../../context/Context';
// import { JoiningScreen } from "./JoiningScreen";

// const DoctorVideoChat = () => {
//     const {
//         callAccepted,
//         myVideo,
//         userVideo,
//         stream,
//         name,
//         setName,
//         callEnded,
//         me,
//         callUser,
//         leaveCall,
//         answerCall,
//         sendMessage,
//         msgRcv,
//         chat,
//         setChat,
//         setMsgRcv,
//         setOtherUser,
//         leaveCall1,
//         userName,
//         myVdoStatus,
//         setMyVdoStatus,
//         userVdoStatus,
//         setUserVdoStatus,
//         updateVideo,
//         myMicStatus,
//         setMyMicStatus,
//         userMicStatus,
//         updateMic,
//         getVideoAudio,
//         receivingCall,
//         setReceivingCall,
//     } = useContext(SocketContext);

//     const [isMeetingStarted, setMeetingStarted] = useState(false);
//     const [currentMessage, setCurrentMessage] = useState("");
//     const [messageList, setMessageList] = useState([]);


//     // useEffect(() => {
//     //     if (myVdoStatus) {
//     //         getVideoAudio();
//     //     }
//     // }, [myVdoStatus])

//     useEffect(() => {
//         getVideoAudio();
//     }, [myVdoStatus])

//     const sendMsg = async () => {
//         if (currentMessage !== "") {
//             const messageData = {
//                 to: me,
//                 name: name,
//                 msg: currentMessage,
//                 time:
//                     new Date(Date.now()).getHours() +
//                     ":" +
//                     new Date(Date.now()).getMinutes(),
//             };

//             sendMessage(messageData);
//             setMessageList((list) => [...list, messageData]);
//             setCurrentMessage("");
//         }
//     };


//     return isMeetingStarted ? <Row className="m-md-0" style={{ backgroundColor: 'black' }}>
//         <Col md={callAccepted ? 5 : 9} className="column">
//             {/* <audio ref={micRef} autoPlay muted /> */}

//             {myVdoStatus ?
//                 <>
//                     {stream &&
//                         <video
//                             height={"100%"}
//                             width={"100%"}
//                             ref={myVideo}
//                             className="video"
//                             autoPlay
//                             playsInline
//                             muted
//                         />}
//                 </>
//                 : <div style={{
//                     backgroundColor: "black",
//                     color: 'white',
//                     height: '33rem',
//                     textAlign: 'center',
//                     fontSize: 'xxx-large',
//                 }}> <h1>{name}</h1> </div>}

//         </Col>
//         {callAccepted && !callEnded ?
//             <Col md={4}>
//                 {/* <audio ref={micRef} autoPlay /> */}

//                 <video id="user" muted playsInline ref={userVideo} height={"100%"} width={"100%"} autoPlay style={{ height: '33rem' }} />
//             </Col> :
//             null}
//         {receivingCall && !callAccepted ? (
//             <Modal size='sm' show={receivingCall && !callAccepted} onHide={receivingCall && !callAccepted}>

//                 <Modal.Body>
//                     <Modal.Title>Someone wants to join this call</Modal.Title>

//                 </Modal.Body>

//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setReceivingCall(!receivingCall)}>Deny</Button>
//                     <Button variant="primary" onClick={answerCall}>Admit</Button>
//                 </Modal.Footer>

//             </Modal>
//         ) : null}

//         <Col md={3} style={{ padding: 0 }}>
//             <div id="wc-container-right" style={{ width: '20rem' }}>
//                 <div className="chat-container window-content-bottom chat-container--normal">
//                     <div className="chat-header__header">
//                         <div className="chat-header__title">Chat</div>
//                     </div>
//                     <div className="chat-container__chat-list"></div>
//                     <div data-no-focus-lock="true">
//                         <TextField
//                             id="filled-multiline-static"
//                             label="Multiline"
//                             multiline
//                             rows={3}
//                             className="chat-box__chat-textarea window-content-bottom"
//                             defaultValue="Default Value"
//                             variant="filled"
//                             value={currentMessage}
//                             onChange={(event) => {
//                                 setCurrentMessage(event.target.value);
//                             }}
//                             onKeyPress={(event) => {
//                                 if (event.key === "Enter")
//                                     sendMsg();
//                             }}

//                         />
//                     </div>
//                 </div>
//             </div>
//         </Col>
//         <footer className="footer">
//             <div className="footer__inner">
//                 <div style={{ display: 'flex', margin: '8px' }}>
//                     <div>
//                         <Tooltip
//                             title={myMicStatus ? "Turn off mic" : "Turn on mic"}
//                             arrow
//                             placement="top">
//                             <Button
//                                 onClick={() => updateMic()}
//                                 variant="contained"
//                                 style={
//                                     myMicStatus
//                                         ? {}
//                                         : {
//                                             backgroundColor: red[500],
//                                             color: "white",
//                                         }
//                                 }
//                             >
//                                 {myMicStatus ? <MicIcon /> : <MicOffIcon />}
//                             </Button>
//                         </Tooltip>
//                     </div>
//                     <div style={{ marginLeft: '8px' }}>
//                         <Tooltip
//                             title={myVdoStatus ? "Turn off camera" : "Turn on camera"}
//                             arrow
//                             placement="top">
//                             <Button
//                                 onClick={() => updateVideo()}
//                                 variant="contained"
//                                 style={
//                                     myVdoStatus
//                                         ? {}
//                                         : {
//                                             backgroundColor: red[500],
//                                             color: "white",
//                                         }
//                                 }>
//                                 {myVdoStatus ? <VideocamIcon /> : <VideocamOffIcon />}
//                             </Button>
//                         </Tooltip>
//                     </div>
//                     {/* <div style={{ marginLeft: '8px' }}>
//                         <Tooltip
//                             title={webcamOn ? "Turn off camera" : "Turn on camera"}
//                             arrow
//                             placement="top">
//                             <Button
//                                 onClick={() => handleToggleChat()}
//                                 variant="contained"
//                             >
//                                 <ChatIcon />
//                             </Button>
//                         </Tooltip>
//                     </div> */}
//                 </div>
//                 <div className="footer-leave-btn-container">
//                     <Button variant="contained" color="error" onClick={leaveCall1}>
//                         Leave
//                     </Button>
//                 </div>
//             </div>
//         </footer>
//     </Row> :
//         <JoiningScreen
//             setMicOn={setMyMicStatus}
//             micOn={myMicStatus}
//             webcamOn={myVdoStatus}
//             setWebcamOn={setMyVdoStatus}    
//             setName={setName}
//             name={name}
//             onClickStartMeeting={() => {
//                 setMeetingStarted(true)
//                 // getVideo()
//             }}
//             startMeeting={isMeetingStarted}
//         />
// }

// export default DoctorVideoChat;