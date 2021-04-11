import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import CustomButton from '../Components/CustomButton'
import Message from '../Components/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'





let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Room(props: any) {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ author: "", message: "Welcome to room " + props.room }]);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [usersVisibility, setUsersVisibility] = useState("invisible")


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

        if (!message) {
            setErrorMessage("Message cannot be empty.")
        } else {
            setErrorMessage("")
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
    }

    const collapse = () => {
        if (usersVisibility === "visible") {
            setUsersVisibility("invisible")
        } else {
            setUsersVisibility("visible")
        }
    }

    function handleLogin() {
        // Here, we invoke the callback with the new value
        props.onChange(false, "", "");
        socket.emit("leave_room", props.room, props.userName)
    }


    return (
        <div className="tw-h-5/6">
            <div className="tw-flex tw-w-full tw-h-full">
                <div className="tw-w-full tw-flex tw-justify-center">
                    <div className="tw-w-3/5 tw-h-2/3 tw-w-full">
                        <div className="tw-w-full tw-flex tw-justify-center tw-my-5">
                            <div>
                                <FontAwesomeIcon size="lg" icon={faUsers} onClick={collapse} className="tw-h-5 tw-w-5 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-absolute tw-left-3 tw-cursor-pointer hover:tw-text-indigo-500" />
                                <div className={"tw-w-4/5 sm:tw-w-1/5 tw-overflow-y-auto tw-left-5 tw-mt-8 tw-absolute tw-p-2 tw-shadow-lg tw-bg-gray-200 tw-" + usersVisibility} style={{ height: "40%" }}>
                                    <div>Users:</div>
                                    {users.map((user: any, index: any) => {
                                        return <div className="tw-mt-2 tw-flex tw-ml-1">
                                            <div className="tw-mr-1">-</div>
                                            <div className={(user.username === props.userName) ? "tw-text-indigo-500 tw-break-all" : "tw-text-yellow-500 tw-break-all"}>{user.username}</div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <h4 className="tw-flex tw-justify-center tw-break-all tw-w-1/2">{"Room: " + props.room}</h4>
                        </div>
                        <div className="tw-flex tw-justify-center tw-h-5/6 sm:tw-h-full">
                            <div className="tw-border tw-overflow-y-auto tw-shadow tw-p-1 tw-bg-gray-50 tw-w-5/6">
                                {messages.map((value) => {
                                    return <Message key="{value}" content={value.message} author={value.author} userName={props.userName}></Message>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="tw-absolute tw-bottom-2 tw-right-1/2">
                        <div className="tw-relative tw--right-1/2">
                            <div className="tw-flex">
                                <input className="tw-mr-1 focus:tw-border-indigo-500 tw-shadow" type="text" placeholder="Message..." onChange={(e) => setMessage(e.target.value)} value={message} style={{ width: "30vh" }}></input>
                                <CustomButton text="Send" color="indigo" onClick={sendMessage} />
                            </div>
                            <h6 className="tw-text-red-500 tw-h-6">{errorMessage}</h6>
                        </div>
                        <div className="tw-relative tw--right-1/2 tw-flex tw-justify-center">
                            <CustomButton text="Leave room" color="red" onClick={handleLogin} custom="tw-h-8 tw-flex tw-items-center" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Room;