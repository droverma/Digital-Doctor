import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { grey, red } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import appointmentService from '../../services/appointment.service';

export function JoiningScreen({
    setWebcamOn,
    setMicOn,
    micOn,
    webcamOn,
    onClickStartMeeting,
    appointmentId
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

    const changeApmtStatus = () => {
        if (localStorage.getItem('role') === 'patient') {
            const filter = `appointmentId=${appointmentId}`
            appointmentService.appointmentByFilter(filter).then(res => {
                let data = {
                    appointmentDate: res.data[0].appointmentDate,
                    appointmentEndTime: res.data[0].appointmentEndTime,
                    appointmentId: res.data[0].appointmentId,
                    appointmentStartTime: res.data[0].appointmentStartTime,
                    appointmentStatus: "PAST",
                    bookedOn: res.data[0].bookedOn,
                    patientEmail: res.data[0].patientEmail,
                    doctorEmail: res.data[0].doctorEmail,
                    slotId: res.data[0].slotId,
                    specialization: res.data[0].specialization,
                    __v: res.data[0].__v,
                    _id: res.data[0]._id
                }
                appointmentService.updateStatusForApmt(data);
            })
        }
    }

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
                            changeApmtStatus();
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
        </Container>
    );
}
