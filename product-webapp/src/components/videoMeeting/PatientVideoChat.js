import { Tooltip } from "@material-ui/core";
import ChatIcon from '@mui/icons-material/Chat';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import { JoiningMeeting } from "./JoiningMeeting";
const socket = io.connect('http://localhost:5000')

const PatientVideoChat = () => {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")

    const [otherUser, setOtherUser] = useState("");
    const [micOn, setMicOn] = useState(true);
    const [webcamOn, setWebcamOn] = useState(true);
    const [chatOn, setChatOn] = useState(false);
    const [isMeetingStarted, setMeetingStarted] = useState(false);
    const videoPlayerRef = useRef(null);
    const [videoTrack, setVideoTrack] = useState(null);

    const userVideo = useRef(null)
    const connectionRef = useRef(null)

    useEffect(() => {
        socket.on("me", (id) => {
            setMe(id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    })

    useEffect(() => {
        if (webcamOn && !videoTrack) {
            getVideo();
        }
    }, [webcamOn, videoTrack])

    const getVideo = async () => {
        if (videoPlayerRef.current) {
            const videoConstraints = {
                video: {
                    width: 1280,
                    height: 720,
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(
                videoConstraints
            );
            const videoTracks = stream.getVideoTracks();

            const videoTrack = videoTracks.length ? videoTracks[0] : null;

            videoPlayerRef.current.srcObject = new MediaStream([videoTrack]);
            videoPlayerRef.current.play();
            setStream(stream)
            setVideoTrack(videoTrack);

        }
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        connectionRef.current = peer
    };

    const handleToggleMic = () => {
        setMicOn(!micOn);
    };

    const handleToggleWebcam = () => {
        if (!webcamOn) {
            getVideo();
        } else {
            if (videoTrack) {
                videoTrack.stop();
                setVideoTrack(null);
            }
        }
        setWebcamOn(!webcamOn);
    };

    const handleToggleChat = () => {
        setChatOn(!chatOn);
    }

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        setOtherUser(id);
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream

        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)
        setOtherUser(caller);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy();
        socket.emit("endCall", { id: otherUser });
        window.location.reload();
    }
    const leaveCall1 = () => {
        socket.emit("endCall", { id: me });
        window.location.reload();
    };

    return isMeetingStarted ?
        <>

            <div
                style={{
                    backgroundColor: "black",
                    overflow: "hidden",
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    position: "relative",
                }}
            >

                <div
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        height: '33rem',
                    }}
                >
                    <div
                        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        {webcamOn ?
                            <video
                                height={"100%"}
                                width={"100%"}
                                ref={videoPlayerRef}
                                style={{
                                    backgroundColor: "black",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    objectFit: "contain",
                                }}
                                autoPlay
                            /> : <div style={{
                                backgroundColor: "black",
                                position: "absolute",
                                color: 'white',
                                textAlign: 'center',
                                top: '13rem',
                                fontSize: 'xxx-large',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                objectFit: "contain",
                            }}>Name</div>}
                        <div
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                            }}
                        >
                            <p
                                style={{
                                    color: webcamOn ? "green" : "red",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    opacity: 1,
                                }}
                            >
                                {callAccepted && !callEnded ?
                                    <video ref={userVideo} autoPlay style={{ width: "300px" }} />
                                    :
                                    null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {chatOn ?
                <div id="wc-container-right" style={{ width: '400px' }}>
                    <div className="chat-container window-content-bottom chat-container--normal"></div>
                </div>
                : null}
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
                        <div style={{ marginLeft: '8px' }}>
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
                        </div>
                    </div>
                    <div className="footer-leave-btn-container">
                        <Button variant="contained" color="error" onClick={leaveCall1}>
                            Leave
                        </Button>
                    </div>
                </div>
            </footer>
            <div>
                {/* <Row>
                <div>
                    <video
                        autoPlay
                        ref={videoPlayerRef}
                        controls={false}
                        style={{ width: '59rem' }}
                    />
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        spacing={2}>
                        <Grid item>
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
                        </Grid>
                        <Grid item>
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
                        </Grid>
                        <Grid item> <Button variant="contained" color="secondary" onClick={leaveCall1}>
                            End Call
                        </Button></Grid>

                    </Grid>
                </div>
                <div >
                    {callAccepted && !callEnded ?
                        <video ref={userVideo} autoPlay style={{ width: "300px" }} /> :
                        null}
                </div>
            </Row> */}


                <div className="myId">
                    {/* <TextField
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: "20px" }}
                />
                <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                    <Button variant="contained" color="primary">
                        Copy ID
                    </Button>
                </CopyToClipboard>

                <TextField
                    id="filled-basic"
                    label="ID to call"
                    variant="filled"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                /> */}
                    {/* <div className="call-button">
                    {callAccepted && !callEnded ? (
                        <Button variant="contained" color="secondary" onClick={leaveCall1}>
                            End Call
                        </Button>
                    ) : (
                        <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                            Call
                        </IconButton>
                    )}
                    {idToCall}
                </div> */}
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1 >{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
        :
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