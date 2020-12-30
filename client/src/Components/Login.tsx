import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Login(this: any) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ author: "", message: "" }]);



    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on("receive_message", (content: any) => {
            setMessages([...messages, content])
        });
    });

    const connectToRoom = () => {
        setLoggedIn(true);
        socket.emit("join_room", room);
    }

    const sendMessage = () => {
        let messageInfo = {
            room: room,
            content: {
                author: userName,
                message: message,
            }
        }

        socket.emit("send_message", messageInfo)
        setMessages([...messages, messageInfo.content])
    }

    return (
        <div>
            {!loggedIn ? (<div>
                <input type="text" placeholder="Name..." onChange={(e) => setUserName(e.target.value)} />
                <input type="text" placeholder="Room id..." onChange={(e) => setRoom(e.target.value)} />
                <button onClick={connectToRoom}>Enter Room</button>
            </div>) :
                (<div>
                    <div>
                        {messages.map((value, key) => {
                            return <h1>{value.author} {value.message}</h1>
                        })}
                    </div>
                    <div>
                        <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></input>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>)}
        </div>
    )

}

export default Login;