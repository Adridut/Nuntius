import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import CustomButton from '../Components/CustomButton'
import UserList from '../Components/UserList'
import Message from '../Components/Message'


let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Room(props: any) {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ author: "", message: "Welcome to room " + props.room }]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        socket = io(CONNECTION_PORT);
        socket.emit("join_room", props.room, props.userName);
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
            room: props.room,
            content: {
                author: props.userName,
                message: message,
            }
        }

        socket.emit("send_message", messageInfo)
        setMessages([...messages, messageInfo.content])
        setMessage("");
    }

    function handleLogin() {
        // Here, we invoke the callback with the new value
        props.onChange(false, "", "");
        socket.emit("leave_room", props.room, props.userName)
    }


    return (
        <div className="tw-h-5/6">
            <div className="tw-flex tw-w-full tw-h-full">
                <div className="tw-absolute tw-w-2/12 tw-overflow-y-auto tw-h-5/6">
                    <UserList userName={props.userName} users={users}></UserList>
                </div>
                <div className="tw-w-full tw-flex tw-justify-center">
                    <div className="tw-w-3/5 tw-h-2/3 tw-w-full">
                        <div className="tw-w-full tw-flex tw-justify-center">
                            <h4 className="tw-my-5 tw-flex tw-justify-center tw-break-all tw-w-1/2">{"Room: " + props.room}</h4>
                        </div>
                        <div className="tw-overflow-y-auto tw-flex tw-justify-center" style={{ height: "80%" }}>
                            <div className="tw-w-1/2">
                                {messages.map((value) => {
                                    return <Message key="{value}" content={value.message} author={value.author} userName={props.userName}></Message>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="tw-absolute tw-bottom-10 tw-right-1/2">
                        <div className="tw-relative tw--right-1/2 tw-flex">
                            <input className="tw-mr-1 focus:tw-border-indigo-500 tw-shadow" type="text" placeholder="Message..." onChange={(e) => setMessage(e.target.value)} value={message} style={{ width: "30vh" }}></input>
                            <CustomButton text="Send" color="indigo" onClick={sendMessage} />
                        </div>
                        <div className="tw-relative tw--right-1/2 tw-flex tw-justify-center tw-mt-5">
                            <CustomButton text="Leave room" color="red" onClick={handleLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Room;