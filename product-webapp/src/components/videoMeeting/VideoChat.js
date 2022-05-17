import { Tooltip } from "@material-ui/core";
import { Send, Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";

import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { Col, Modal, Row } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { SocketContext } from '../../context/Context';
import { JoiningScreen } from "./JoiningScreen";

const VideoChat = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    leaveCall,
    leaveCall1,
    answerCall,
    sendMessage,
    chat,
    setChat,
    userName,
    myVdoStatus,
    userVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
    getVideoAudio,
    socket,
    receivingCall,
    setReceivingCall,
    setMyMicStatus,
    setMyVdoStatus,
    callUser,
    createMeeting
  } = useContext(SocketContext);

  const { state } = useLocation();
  const [currentMessage, setCurrentMessage] = useState("");
  const [isMeetingStarted, setMeetingStarted] = useState(false);

  useEffect(() => {
    // createMeeting();
    if (myVdoStatus)
      getVideoAudio();
  }, [myVdoStatus])
  // useEffect(() => {
  //   createMeeting();
  // }, [])

  socket.on("msgRcv", ({ name, msg: value, sender }) => {
    let msg = {};
    msg.msg = value;
    msg.type = "rcv";
    msg.sender = sender;
    msg.timestamp = Date.now();
    setChat([...chat, msg]);
  });

  const sendMsg = async () => {
    if (currentMessage !== "") {
      const messageData = {
        to: me,
        name: name,
        msg: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      sendMessage(messageData);
      setCurrentMessage("");
    }
  };

  return (
    isMeetingStarted ?
      <Row className="m-md-0" style={{ backgroundColor: '#161616' }}>
         {callAccepted && !callEnded && (
          <Col md={7}>
            <div
              className={userMicStatus ? 'namebutton' : 'mutebutton'}
            // style={{
            //   color: 'white',
            //   // opacity: `${userVdoStatus ? "-1" : "2"}`,
            //   position: 'absolute',
            //   marginLeft: "0%",
            //   marginTop: `${!userMicStatus ? "19.5rem" : "19.7rem"}`,
            //   fontSize: 'small',
            //   backgroundColor: 'grey',
            //   padding: '1.5px',
            // }}
            >
              {!userMicStatus && <MicOff style={{ color: 'red' }} />}

              {userName || call.name}
            </div>
            <video
              id="user"
              playsInline
              ref={userVideo}
              autoPlay
              height={"100%"}
              width={"100%"}
              style={{
                opacity: `${userVdoStatus ? "1" : "0"}`,
              }}
            />
          </Col>
        )}
        <Col md={callAccepted ? 2 : 9} className="column">
          {stream &&
            < >
              <div style={{
                color: 'white',
                opacity: `${myVdoStatus ? "-1" : "2"}`,
                position: 'absolute',
                marginLeft: `${!callAccepted ? "25%" : "3.2rem"}`,
                marginTop: `${!callAccepted ? "17%" : "15rem"}`,
                fontSize: 'large'
              }}>
                {name}
              </div>
              <video
                height={"100%"}
                width={"100%"}
                ref={myVideo}
                className="video"
                autoPlay
                playsInline
                muted
              />

            </>
          }
        </Col>

       
        {receivingCall && !callAccepted ? (
          <Modal size='sm' show={receivingCall && !callAccepted} onHide={!receivingCall && callAccepted}>

            <Modal.Body>
              <Modal.Title>Someone wants to join this call</Modal.Title>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setReceivingCall(!receivingCall)}>Deny</Button>
              <Button variant="primary" onClick={answerCall}>Admit</Button>
            </Modal.Footer>

          </Modal>
        ) : null}
        <Col md={3} style={{ padding: 0 }}>
          <div id="wc-container-right" style={{ width: '16.2rem' }}>
            <div className="chat-container window-content-bottom chat-container--normal">
              <div className="chat-header__header">
                <div className="chat-header__title">Chat</div>
              </div>
              <div className="chat-container__chat-list">
                {chat.length ?
                  <div className="msg_flex">
                    {chat.map((msg) => (
                      <div
                        className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}
                      >
                        <h5>{msg.msg.name}</h5>
                        {msg.msg.msg}
                      </div>
                    ))}
                  </div>
                  : null}
              </div>
              <div data-no-focus-lock="true">
                {/* <TextField
                  id="filled-multiline-static"
                  label="Send a message"
                  multiline
                  rows={3}
                  className="chat-box__chat-textarea window-content-bottom"
                  defaultValue="Default Value"
                  variant="filled"
                  value={currentMessage}
                  onChange={(event) => {
                    setCurrentMessage(event.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter")
                      sendMsg();
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={sendMsg}
                        edge="end"
                      >
                        <VideocamIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                /> */}
                <FormControl variant="filled" className="chat-box__chat-textarea window-content-bottom"
                >
                  <InputLabel>Send a message</InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    multiline
                    rows={3}
                    className="chat-box__chat-textarea window-content-bottom"
                    value={currentMessage}
                    onChange={(event) => {
                      setCurrentMessage(event.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                        >
                          <Send onClick={sendMsg} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </Col>
        <div className="footer">
          <div className="footer__inner">
            <div style={{ display: 'flex', margin: '8px' }}>
              <div>
                <Tooltip
                  title={myMicStatus ? "Turn off mic" : "Turn on mic"}
                  arrow
                  placement="top">
                  <Button
                    onClick={() => updateMic()}
                    variant="contained"
                    style={
                      myMicStatus
                        ? {}
                        : {
                          backgroundColor: red[500],
                          color: "white",
                        }
                    }
                  >
                    {myMicStatus ? <Mic /> : <MicOff />}
                  </Button>
                </Tooltip>
              </div>
              <div style={{ marginLeft: '8px' }}>
                <Tooltip
                  title={myVdoStatus ? "Turn off camera" : "Turn on camera"}
                  arrow
                  placement="top">
                  <Button
                    onClick={() => updateVideo()}
                    variant="contained"
                    style={
                      myVdoStatus
                        ? {}
                        : {
                          backgroundColor: red[500],
                          color: "white",
                        }
                    }>
                    {myVdoStatus ? <Videocam /> : <VideocamOff />}
                  </Button>
                </Tooltip>
              </div>
              {/* <div style={{ marginLeft: '8px' }}>
                        <Tooltip
                            title={webcamOn ? "Turn off camera" : "Turn on camera"}
                            arrow
                            placement="top">
                            <Button
                                onClick={() => handleToggleChat()}
                                variant="contained"
                            >
                                <ChatIcon />
                            </Button>
                        </Tooltip>
                    </div> */}
            </div>
            <div className="footer-leave-btn-container">
              <Button variant="contained" color="error" onClick={leaveCall1}>
                Leave
              </Button>
            </div>
          </div>
        </div>
      </Row> :
      <JoiningScreen
        setMicOn={setMyMicStatus}
        micOn={myMicStatus}
        webcamOn={myVdoStatus}
        setWebcamOn={setMyVdoStatus}
        setName={setName}
        name={name}
        onClickStartMeeting={() => {
          setMeetingStarted(true);
          getVideoAudio();

          if (state) {
            callUser(state);
          }
        }}
        startMeeting={isMeetingStarted}
      />
  );
};

export default VideoChat;
