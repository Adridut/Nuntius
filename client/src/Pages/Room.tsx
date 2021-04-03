import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import CustomButton from '../Components/CustomButton'
import UserList from '../Components/UserList'

let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Room(props: any) {



    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ author: "", message: "" }]);
    const [users, setUsers] = useState([]);



    const userName = props.location.state.userName;
    const room = props.location.search.split("?id=")[1];

    useEffect(() => {
        socket = io(CONNECTION_PORT);
        socket.emit("join_room", room, userName);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on('roomUsers', ({ users }: any) => {
            setUsers(users);
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
                <div className="tw-absolute">
                    <h4 className="tw-mt-5 tw-ml-5">{"Room: " + room}</h4>
                    <UserList userName={userName} users={users}></UserList>
                </div>
                <div className="tw-w-full tw-flex tw-justify-center">
                    <div>
                        <div className="tw-h-2/3 tw-overflow-y-auto tw-w-full">
                            <h4 className="tw-my-5">Messages: </h4>
                            {messages.map((value, key) => {
                                return <div>{value.author} {value.message}</div>
                            })}
                        </div>
                        <div className="tw-absolute tw-bottom-10 tw-right-1/2">
                            <div className="tw-relative tw--right-1/2 tw-flex">
                                <input className="tw-h-11 tw-mr-1 focus:tw-border-indigo-500" type="text" placeholder="Message..." onChange={(e) => setMessage(e.target.value)} value={message}></input>
                                <CustomButton text="Send" color="indigo" onClick={sendMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Room;