import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [otherUser, setOtherUser] = useState("");
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [videoTrack, setVideoTrack] = useState(null);
    const [audioTrack, setAudioTrack] = useState(null);
    const [idToCall, setIdToCall] = useState("")
    const [micOn, setMicOn] = useState(true);
    const [webcamOn, setWebcamOn] = useState(true);
    const [chatOn, setChatOn] = useState(false);

    const myVideo = useRef();
    const micRef = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //     .then((currentStream) => {
        //         setStream(currentStream);

        //         myVideo.current.srcObject = currentStream;
        //     });
        socket.on('me', (id) => {
            setMe(id)
        });
        // if (webcamOn && !videoTrack) {
        //     getVideo();
        // }
        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    })

    const createId = () => {
        socket.on('me', (id) => setMe(id));
    }
    const getVideo = async () => {
        console.log(me, 'id')
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
                const videoTracks = currentStream.getVideoTracks();
                const videoTrack = videoTracks.length ? videoTracks[0] : null;
                setVideoTrack(videoTrack);
            });
        // if (myVideo.current) {
        //     const videoConstraints = {
        //         video: {
        //             width: 1280,
        //             height: 720,
        //         },
        //     };

        //     const stream = await navigator.mediaDevices.getUserMedia(
        //         videoConstraints
        //     );
        //     const videoTracks = stream.getVideoTracks();

        //     const videoTrack = videoTracks.length ? videoTracks[0] : null;

        //     myVideo.current.srcObject = new MediaStream([videoTrack]);
        //     // myVideo.current.play();
        //     setStream(stream)
        //     setVideoTrack(videoTrack);

        // }
        // const peer = new Peer({
        //     initiator: true,
        //     trickle: false,
        //     stream: stream
        // })
        // connectionRef.current = peer

    };
    const getAudio = async () => {
        console.log(me, 'id')
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                micRef.current.srcObject = currentStream;
                const audioTracks = currentStream.getAudioTracks();
                const audioTrack = audioTracks.length ? audioTracks[0] : null;
                setAudioTrack(audioTrack);
                console.log(audioTrack, 'audioooo')
            });

    };


    const handleToggleMic = () => {
        if (!micOn) {
            getAudio();
        } else {
            if (audioTrack) {
                audioTrack.stop();
                setAudioTrack(null);
            }
        }
        setMicOn(!micOn);
    };

    const handleToggleWebcam = () => {
        console.log(videoTrack)
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

    return (
        <SocketContext.Provider value={{
            createId,
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            setMe,
            callUser,
            leaveCall,
            answerCall,
            getVideo,
            videoTrack,
            idToCall,
            leaveCall1,
            setCall,
            receivingCall,
            setIdToCall,
            webcamOn,
            setWebcamOn,
            micOn,
            setMicOn,
            handleToggleChat,
            handleToggleMic,
            handleToggleWebcam,
            micRef,
            getAudio,
            audioTrack
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
