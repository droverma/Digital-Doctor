import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoChatService from "../../services/VideoChat.service";

const ChatMeeting = () => {
    const { state } = useLocation();
    const [chat, setChat] = useState([]);

    useEffect(() => {
        console.log(state)
        VideoChatService.chatMeetingDetails(state)
            .then(res => {
                setChat(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setChat(chat)
    }, [chat])


    // const sendMsg = async () => {
    //     if (currentMessage !== "") {
    //         const messageData = {
    //             to: localStorage.getItem,
    //             name: name,
    //             msg: currentMessage,
    //             time:
    //                 new Date(Date.now()).getHours() +
    //                 ":" +
    //                 new Date(Date.now()).getMinutes(),
    //         };

    //         sendMessage(messageData);
    //         setCurrentMessage("");
    //     }
    // };

    return (
        <div className="chat-messages">
            <div className="chat-messages-show-container">
                <ul className="chat-container__chat-list">
                    <div className="msg_flex">
                        {chat && chat.map((msg, i) =>

                            // <div className="chat-msg" key={i} >
                            //     {console.log(data.role !== localStorage.getItem('role'))}
                            //     <div id={data.role === localStorage.getItem('role') ? 'msg_sent' : 'msg_rcv'} className='text-size'>{data.sender}</div>

                            //     <div id={data.role === localStorage.getItem('role') ? 'msg_sent' : 'msg_rcv'}>{data.msg}{data.role}</div>

                            // </div>
                            <  div
                                className={msg.role === localStorage.getItem('role') ? "msg_sent" : "msg_rcv"}
                            >
                                <h5>{msg.sender}</h5>{msg.msg}
                                <div className="time">{msg.time}</div>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
            <div className="chat-messages-create-container">
                <input className="chat-messages-create-input" type="text" />
                <button className="chat-messages-create-button" disabled={true}> Send </button>
            </div>
        </div >
    );
};

export default ChatMeeting;
