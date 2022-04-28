import { Tooltip } from "@material-ui/core";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { Col, Modal, Row } from 'react-bootstrap';
import { SocketContext } from '../../context/Context';
import { JoiningMeeting } from "./JoiningMeeting";

const DoctorVideoChat = () => {
    const {
        stream,
        callAccepted,
        myVideo,
        videoTrack,
        receivingCall,
        setReceivingCall,
        callEnded,
        getVideo,
        leaveCall1,
        webcamOn,
        setWebcamOn,
        setMicOn,
        answerCall,
        micOn,
        userVideo,
        handleToggleMic,
        handleToggleWebcam,
        micRef,
        getAudio,
        audioTrack } = useContext(SocketContext);

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
    }, [webcamOn])

    useEffect(() => {
        if (micOn && !audioTrack) {
            getAudio();
        }
    }, [webcamOn])

    // useEffect(() => {
    //     if (webcamOn && !videoTrack) {
    //         getVideo();
    //     }
    // }, [webcamOn, videoTrack])

    // const getVideo = async () => {
    //     if (videoPlayerRef.current) {
    //         const videoConstraints = {
    //             video: {
    //                 width: 1280,
    //                 height: 720,
    //             },
    //         };

    //         const stream = await navigator.mediaDevices.getUserMedia(
    //             videoConstraints
    //         );
    //         const videoTracks = stream.getVideoTracks();

    //         const videoTrack = videoTracks.length ? videoTracks[0] : null;

    //         videoPlayerRef.current.srcObject = new MediaStream([videoTrack]);
    //         videoPlayerRef.current.play();
    //         setStream(stream)
    //         setVideoTrack(videoTrack);

    //     }
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream
    //     })
    //     connectionRef.current = peer
    // };

    // const handleToggleMic = () => {
    //     setMicOn(!micOn);
    // };

    // const handleToggleWebcam = () => {
    //     if (!webcamOn) {
    //         getVideo();
    //     } else {
    //         if (videoTrack) {
    //             videoTrack.stop();
    //             setVideoTrack(null);
    //         }
    //     }
    //     setWebcamOn(!webcamOn);
    // };

    // const handleToggleChat = () => {
    //     setChatOn(!chatOn);
    // }

    // const callUser = (id) => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream
    //     })
    //     setOtherUser(id);
    //     peer.on("signal", (data) => {
    //         socket.emit("callUser", {
    //             userToCall: id,
    //             signalData: data,
    //             from: me,
    //             name: name
    //         })
    //     })
    //     peer.on("stream", (stream) => {

    //         userVideo.current.srcObject = stream

    //     })
    //     socket.on("callAccepted", (signal) => {
    //         setCallAccepted(true)
    //         peer.signal(signal)
    //     })

    //     connectionRef.current = peer
    // }

    // const answerCall = () => {
    //     setCallAccepted(true)
    //     setOtherUser(caller);
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream
    //     })
    //     peer.on("signal", (data) => {
    //         socket.emit("answerCall", { signal: data, to: caller })
    //     })
    //     peer.on("stream", (stream) => {
    //         userVideo.current.srcObject = stream
    //     })

    //     peer.signal(callerSignal)
    //     connectionRef.current = peer
    // }

    // const leaveCall = () => {
    //     setCallEnded(true)
    //     connectionRef.current.destroy();
    //     socket.emit("endCall", { id: otherUser });
    //     window.location.reload();
    // }
    // const leaveCall1 = () => {
    //     socket.emit("endCall", { id: me });
    //     window.location.reload();
    // };
    return isMeetingStarted ? <Row className="m-md-0" style={{ backgroundColor: 'black' }}>
        <Col md={callAccepted ? 5 : 9} className="column">
            <audio ref={micRef} autoPlay muted />

            {webcamOn ?
                <>
                    {stream &&
                        <video
                            height={"100%"}
                            width={"100%"}
                            ref={myVideo}
                            className="video"
                            autoPlay
                            playsInline
                            muted
                        />}
                </>
                : <div style={{
                    backgroundColor: "black",
                    color: 'white',
                    height: '33rem',
                    textAlign: 'center',
                    fontSize: 'xxx-large',
                }}> <h1>Name</h1> </div>}

        </Col>
        {callAccepted && !callEnded ?
            <Col md={4}>
                <audio ref={micRef} autoPlay />

                <video id="user" muted playsInline ref={userVideo} height={"100%"} width={"100%"} autoPlay style={{ height: '33rem' }} />
            </Col> :
            null}
        {receivingCall && !callAccepted ? (
            <Modal size='sm' show={receivingCall && !callAccepted} onHide={receivingCall && !callAccepted}>

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
                    <Button variant="contained" color="error" onClick={leaveCall1}>
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

export default DoctorVideoChat;