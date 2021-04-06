import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import CustomButton from '../Components/CustomButton'
import UserList from '../Components/UserList'
import Message from '../Components/Message'


let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Room(props: any) {

    const userName = props.location.state.userName;
    const room = props.location.search.split("?id=")[1];


    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ author: "", message: "Welcome to room " + room }]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        socket = io(CONNECTION_PORT);
        socket.emit("join_room", room, userName);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on('new_user', ({ users, user }: any) => {
            setUsers(users);
            setMessages([...messages, { author: "", message: user + " joined the room" }])
        });
    });

    useEffect(() => {
        socket.on('user_left', ({ users, user }: any) => {
            setUsers(users);
            setMessages([...messages, { author: "", message: user + " left the room" }])
        });
    });

    useEffect(() => {
        socket.on("receive_message", (content: any) => {
            setMessages([...messages, content])
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
        setMessage("");
    }


    return (
        <div className="tw-h-5/6">
            <div className="tw-flex tw-w-full tw-h-full">
                <div className="tw-absolute tw-w-2/12">
                    <UserList userName={userName} users={users}></UserList>
                </div>
                <div className="tw-w-full tw-flex tw-justify-center">
                    <div className="tw-w-3/5 tw-h-2/3 tw-w-full">
                        <h4 className="tw-my-5 tw-flex tw-justify-center">{"Room: " + room}</h4>
                        <div className="tw-overflow-y-auto tw-flex tw-justify-center" style={{ height: "88%" }}>
                            <div className="tw-w-1/2">
                                {messages.map((value) => {
                                    return <Message key="{value}" content={value.message} author={value.author} userName={userName}></Message>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="tw-absolute tw-bottom-10 tw-right-1/2">
                        <div className="tw-relative tw--right-1/2 tw-flex">
                            <input className="tw-mr-1 focus:tw-border-indigo-500 tw-shadow" type="text" placeholder="Message..." onChange={(e) => setMessage(e.target.value)} value={message}></input>
                            <CustomButton text="Send" color="indigo" onClick={sendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Room;