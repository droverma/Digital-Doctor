import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [userStream, setUserStream] = useState();
    const [chat, setChat] = useState([]);
    const [name, setName] = useState("");
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const [userName, setUserName] = useState("");
    const [otherUser, setOtherUser] = useState("");
    const [myVdoStatus, setMyVdoStatus] = useState(true);
    const [userVdoStatus, setUserVdoStatus] = useState();
    const [myMicStatus, setMyMicStatus] = useState(true);
    const [userMicStatus, setUserMicStatus] = useState();
    const [msgRcv, setMsgRcv] = useState("");
    const [receivingCall, setReceivingCall] = useState(false)


    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const connectionRef = useRef();

    useEffect(() => {
        // createMeeting()
        socket.on("endCall", () => {
            window.location.reload();
        });

        socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
            if (currentMediaStatus !== null || currentMediaStatus !== []) {
                switch (type) {
                    case "video":
                        setUserVdoStatus(currentMediaStatus);
                        break;
                    case "mic":
                        setUserMicStatus(currentMediaStatus);
                        break;
                    default:
                        setUserMicStatus(currentMediaStatus[0]);
                        setUserVdoStatus(currentMediaStatus[1]);
                        break;
                }
            }
        });

        socket.on("callUser", ({ from, name: callerName, signal }) => {
            setReceivingCall(true)
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        socket.on("msgRcv", ({ name, msg: value, sender }) => {
            setMsgRcv({ value, sender });
            setTimeout(() => {
                setMsgRcv({});
            }, 2000);
        });
    }, []);

    const createMeeting = async () => {

        await socket.on("me", async (id) => {

            console.log(id, 'id')
            await setMe(id)
        }
        );
    }
    const getVideoAudio = async () => {
        console.log(me, 'id')
        try {
            await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
                if (!myVdoStatus) {
                    currentStream.getVideoTracks()[0].enabled = false;
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const updateVideo = () => {
        setMyVdoStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "video",
                currentMediaStatus: !currentStatus,
            });
            stream.getVideoTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    const updateMic = () => {
        setMyMicStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "mic",
                currentMediaStatus: !currentStatus,
            });
            stream.getAudioTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    const callUser = (id) => {

        const peer = new Peer({ initiator: true, trickle: false, stream });
        setOtherUser(id);
        peer.on("signal", (data) => {

            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name,
            });
        });

        peer.on("stream", (currentStream) => {

            setUserStream(currentStream);
            userVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", ({ signal, userName }) => {

            setCallAccepted(true);
            setUserName(userName);
            peer.signal(signal);
            socket.emit("updateMyMedia", {
                type: "both",
                currentMediaStatus: [myMicStatus, myVdoStatus],
            });
        });

        connectionRef.current = peer;
        console.log(connectionRef.current);
    };

    const answerCall = () => {
        setCallAccepted(true);
        setOtherUser(call.from);
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {

            socket.emit("answerCall", {
                signal: data,
                to: call.from,
                userName: name,
                type: "both",
                myMediaStatus: [myMicStatus, myVdoStatus],
            });
        });

        peer.on("stream", (currentStream) => {
            setUserStream(currentStream);
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
        console.log(connectionRef.current);
    };

    const sendMessage = (value) => {
        socket.emit("msgUser", { name, to: otherUser, msg: value, sender: name });
        let msg = {};
        msg.msg = value;
        msg.type = "sent";
        msg.timestamp = Date.now();
        msg.sender = name;
        setChat([...chat, msg]);
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();
        socket.emit("endCall", { id: otherUser });
        window.location.reload();
    };

    const leaveCall1 = () => {
        socket.emit("endCall", { id: otherUser });
        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                myVideo,
                userVideo,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall,
                sendMessage,
                msgRcv,
                chat,
                setChat,
                setMsgRcv,
                setOtherUser,
                leaveCall1,
                userName,
                myVdoStatus,
                setMyVdoStatus,
                userVdoStatus,
                setUserVdoStatus,
                updateVideo,
                myMicStatus,
                setMyMicStatus,
                userMicStatus,
                updateMic,
                getVideoAudio,
                receivingCall,
                setReceivingCall,
                socket,
                createMeeting
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
