import {
    Box,
    Button, Grid,
    makeStyles, Tooltip, useTheme
} from "@material-ui/core";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { red } from "@mui/material/colors";
// import makeStyles from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import useResponsiveSize from "./utils/UseResponsiveSize";
// import { MeetingDetailsScreen } from "./MeetingDetailsScreen";

const useStyles = makeStyles((theme) => ({
    video: {
        borderRadius: "10px",
        backgroundColor: "#1c1c1c",
        height: "100%",
        width: "100%",
        objectFit: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    toggleButton: {
        borderRadius: "100%",
        minWidth: "auto",
        width: "44px",
        height: "44px",
    },

    previewBox: {
        width: "100%",
        height: "45vh",
        position: "relative",
    },
}));

export function JoiningScreen({
    setWebcamOn,
    setMicOn,
    micOn,
    webcamOn,
    onClickStartMeeting,
}) {
    const theme = useTheme();
    const styles = useStyles(theme);
    const padding = useResponsiveSize({
        xl: 6,
        lg: 6,
        md: 6,
        sm: 4,
        xs: 1.5,
    });
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
            videoPlayerRef.current.play();

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
        <Box
            style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                height: "80vh",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
                padding: padding,
            }}>

            <Grid
                item
                xs={12}
                md={6}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Box
                    m={6}
                    style={{
                        display: "flex",
                        flex: 1,
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: padding,
                    }}>
                    <Box className={styles.previewBox}>

                        <video
                            autoPlay
                            playsInline
                            muted
                            ref={videoPlayerRef}
                            controls={false}
                            className={styles.video + " flip"}
                        />
                        <Box
                            position="absolute"
                            bottom={theme.spacing(2)}
                            marginTop="1rem"
                            left="0"
                            right="0">
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
                                            className={styles.toggleButton}>
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
                                            }
                                            className={styles.toggleButton}>
                                            {webcamOn ? <VideocamIcon /> : <VideocamOffIcon />}
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems="center"
                                justify="center"
                                spacing={2}>

                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={(e) => {
                                            if (videoTrack) {
                                                videoTrack.stop();
                                                setVideoTrack(null);
                                            }
                                            onClickStartMeeting();
                                        }}
                                        id={"btnJoin"}>
                                        Start
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}
