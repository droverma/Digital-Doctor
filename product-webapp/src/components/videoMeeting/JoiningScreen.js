import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { TextField } from '@mui/material';
import { red, grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

export function JoiningScreen({
    setWebcamOn,
    setMicOn,
    micOn,
    webcamOn,
    onClickStartMeeting,
    name,
    setName
}) {

    const videoPlayerRef = useRef();
    const [videoTrack, setVideoTrack] = useState(null);

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
            setVideoTrack(videoTrack);
        }
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
    return (
        <Container>
            <Row>
                <Col md={12} style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: '1rem'
                }}>
                    <video
                        autoPlay
                        playsInline
                        muted
                        width={'100%'}
                        height={'100%'}
                        style={{ width: '33rem', borderRadius: '10px' }}
                        ref={videoPlayerRef}
                        controls={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6} style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    display: 'flex',
                    marginTop: '1rem'
                }}>
                    <Button
                        onClick={() => handleToggleMic()}
                        variant="contained"
                        style={
                            micOn
                                ? {
                                    borderRadius: "20px",
                                    backgroundColor: grey[500]
                                }
                                : {
                                    backgroundColor: red[500],
                                    borderRadius: "20px",
                                    color: "white",
                                }
                        }>
                        {micOn ? <MicIcon /> : <MicOffIcon />}
                    </Button>
                </Col>
                <Col md={6} style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    marginTop: '1rem'
                }}>

                    <Button
                        onClick={() => handleToggleWebcam()}
                        variant="contained"
                        style={
                            webcamOn
                                ? {
                                    borderRadius: "20px",
                                    backgroundColor: grey[500]
                                }
                                : {
                                    backgroundColor: red[500],
                                    color: "white",
                                    borderRadius: "20px",
                                }
                        }>
                        {webcamOn ? <VideocamIcon /> : <VideocamOffIcon />}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: '1rem'
                }}>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            if (videoTrack) {
                                videoTrack.stop();
                                setVideoTrack(null);
                            }
                            onClickStartMeeting();
                        }}
                        style={{ width: '17%' }}>
                        {localStorage.getItem('role') === 'doctor'
                            ?
                            'Start Meeting'
                            :
                            'Join'
                        }
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: '1rem'
                }}>
                    <TextField
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
}
