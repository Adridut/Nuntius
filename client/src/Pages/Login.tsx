import { useEffect, useState } from 'react'
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
        <div className="tw-h-5/6">
            {!loggedIn ? (
                <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                    <div className="border shadow tw-w-1/3 tw-flex tw-items-center tw-justify-center">
                        <div>
                            <div className="tw-flex tw-m-4 tw-mt-8">
                                <input className="focus:tw-border-blue-500 tw-mr-2" type="text" placeholder="Name..." onChange={(e) => setUserName(e.target.value)} />
                                <input className="focus:tw-border-red-500 tw-ml-2" type="text" placeholder="Room..." onChange={(e) => setRoom(e.target.value)} />
                            </div>
                            <button className="tw-border-green-500 tw-text-green-500 hover:tw-bg-green-500 hover:tw-text-white tw-m-4 tw-mb-8" onClick={connectToRoom}>Join Room</button>
                        </div>
                    </div>
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