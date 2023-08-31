import { Avatar, Button, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const MessageContainer = () => {
    const initialMessages = [
        { user: "Md kaif", text: "Hello!", type: "received" },
        { user: "Md kaif", text: "Hi there!", type: "sent" },
        { user: "Md kaif", text: "How are you?", type: "received" },
        { user: "Md kaif", text: "I'm doing well, thanks!", type: "sent" },
        { user: "Md kaif", text: "That's great to hear!", type: "received" },
    ];


    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, type: 'sent' }]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen single-card" style={{ borderRadius: "3px" }}>
            <div className="flex-1 p-5 overflow-y-auto h-72">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-${message.type === 'received' ? 'start' : 'end'} mb-4`}
                    >

                        <div className={`flex ${message.type === 'sent' && "flex-row-reverse"}`}>
                            <div className="profile mx-2 flex flex-col">
                                <Avatar className='w-10 h-10' variant='rounded' src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-5.jpg" />
                                <span>10:00</span>
                            </div>
                            <div
                                className={`text-black  bg-[#EEF2F7] py-2 px-4 rounded`}
                                style={{borderRadius: message.type === 'received' ? `0px 8px 8px 8px` : `8px 0px 8px 8px` }}
                            >
                                <Typography className="font-bold">
                                    {message.user}
                                </Typography>
                                <Typography className="font-light">
                                    {message.text}
                                </Typography>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" p-4 bg-[#EEF2F7]">
                <div className="flex justify-around">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 my-1 w-full message-input p-2 border rounded-none outline-none focus:outline-none border-none"
                        placeholder="Type a message..."
                    />
                    <Button size="sm" className='button--submit my-1 font-normal border-none rounded-sm bg-[#09BF8C]'>
                        <i class="fa-regular fa-paper-plane" style={{ color: "#ffffff" }}></i>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
