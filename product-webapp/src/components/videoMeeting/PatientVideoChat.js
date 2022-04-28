import { Tooltip } from "@material-ui/core";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useContext, useEffect,useState } from "react";
import io from "socket.io-client";
import { SocketContext } from '../../context/Context';
import { Col, Modal, Row } from 'react-bootstrap';
import { JoiningMeeting } from "./JoiningMeeting";
const socket = io.connect('http://localhost:5000')

const PatientVideoChat = () => {
    const {
        callAccepted,
        myVideo,
        videoTrack,
        receivingCall,
        setReceivingCall,
        callEnded,
        getVideo,
        leaveCall,
        webcamOn,
        setWebcamOn,
        setMicOn,
        answerCall,
        micOn,
        userVideo,
        handleToggleMic,
        handleToggleWebcam } = useContext(SocketContext);

    // const [me, setMe] = useState("")
    // const [stream, setStream] = useState()
    // const [receivingCall, setReceivingCall] = useState(false)
    // const [caller, setCaller] = useState("")
    // const [callerSignal, setCallerSignal] = useState()
    // const [callAccepted, setCallAccepted] = useState(false)
    // const [idToCall, setIdToCall] = useState("")
    // const [callEnded, setCallEnded] = useState(false)
    // const [name, setName] = useState("")

    // const [otherUser, setOtherUser] = useState("");
    // const [micOn, setMicOn] = useState(true);
    // const [webcamOn, setWebcamOn] = useState(true);
    // const [chatOn, setChatOn] = useState(false);
    const [isMeetingStarted, setMeetingStarted] = useState(false);
    // const videoPlayerRef = useRef(null);
    // const [videoTrack, setVideoTrack] = useState(null);

    // const userVideo = useRef(null)
    // const connectionRef = useRef(null)

    useEffect(() => {
        if (webcamOn && !videoTrack) {
            getVideo();
        }
    })

    return isMeetingStarted ?
        <Row className="m-md-0" style={{ backgroundColor: 'black' }}>
            <Col md={callAccepted ? 5 : 9}>
                {webcamOn ?
                    <video
                        height={"100%"}
                        width={"100%"}
                        ref={myVideo}
                        style={{ height: '33rem' }}
                        autoPlay
                        playsInline 
                        muted 
                    /> : <div style={{
                        backgroundColor: "black",
                        color: 'white',
                        height: '33rem',
                        textAlign: 'center',
                        fontSize: 'xxx-large',
                    }}> <h1>Patient</h1> </div>}

            </Col>
            {callAccepted && !callEnded ?
                <Col md={4}>
                    <video  playsInline muted ref={userVideo} height={"100%"} width={"100%"} autoPlay style={{ height: '33rem' }} />
                </Col> :
                null}   

            <Col md={3} style={{ padding: 0 }}>
                <div id="wc-container-right" style={{ width: '20rem' }}>
                    <div className="chat-container window-content-bottom chat-container--normal">
                        <div className="chat-header__header">
                            <div className="chat-header__title">Chat</div>
                        </div>
                        <div className="chat-container__chat-list"></div>
                        <div data-no-focus-lock="true">
                            <textarea className="chat-box__chat-textarea window-content-bottom"
                                placeholder="Type message here ..."
                                type="text"
                                title="chat message"
                                rows="3"
                                maxlength="1024"></textarea>
                        </div>
                    </div>
                </div>
            </Col>
            <footer className="footer">
                <div className="footer__inner">
                    <div style={{ display: 'flex', margin: '8px' }}>
                        <div>
                            <Tooltip
                                title={micOn ? "Turn off mic" : "Turn on mic"}
                                arrow
                                placement="top">
                                <Button
                                    onClick={() => handleToggleMic()}
                                    variant="contained"
                                    style={
                                        micOn
                                            ? {}
                                            : {
                                                backgroundColor: red[500],
                                                color: "white",
                                            }
                                    }
                                >
                                    {micOn ? <MicIcon /> : <MicOffIcon />}
                                </Button>
                            </Tooltip>
                        </div>
                        <div style={{ marginLeft: '8px' }}>
                            <Tooltip
                                title={webcamOn ? "Turn off camera" : "Turn on camera"}
                                arrow
                                placement="top">
                                <Button
                                    onClick={() => handleToggleWebcam()}
                                    variant="contained"
                                    style={
                                        webcamOn
                                            ? {}
                                            : {
                                                backgroundColor: red[500],
                                                color: "white",
                                            }
                                    }>
                                    {webcamOn ? <VideocamIcon /> : <VideocamOffIcon />}
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
                        <Button variant="contained" color="error" onClick={leaveCall}>
                            Leave
                        </Button>
                    </div>
                </div>
            </footer>
        </Row> :
        <JoiningMeeting
            setMicOn={setMicOn}
            micOn={micOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            onClickStartMeeting={() => {
                setMeetingStarted(true)
                // getVideo()
            }}
            startMeeting={isMeetingStarted}
        />

}

export default PatientVideoChat;