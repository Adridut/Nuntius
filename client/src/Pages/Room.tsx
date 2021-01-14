import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'


let socket: any;
const CONNECTION_PORT = 'localhost:3001/'




function Room(props: any) {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ author: "", message: "" }]);
    const [users, setUsers]: any = useState([]);

    const userName = props.location.state.userName;
    const room = props.location.state.room;


    useEffect(() => {
        socket = io(CONNECTION_PORT);
        socket.emit("join_room", room, userName);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on("receive_message", (content: any) => {
            setMessages([...messages, content])
        });
    });

    useEffect(() => {
        socket.on('roomUsers', ({ room, users }: any) => {
            setUsers(users);
          });
    });

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
            {/* <div>{room}</div>
            <div>{userName}</div> */}
            <div>
                {users.map((user: any, key: any) => {
                    return <div>{user.username}</div>
                })}
            </div>
            <div>
                {messages.map((value, key) => {
                    return <div>{value.author} {value.message}</div>
                })}
            </div>
            <div>
                <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></input>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )

}

export default Room;