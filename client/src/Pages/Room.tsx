import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import Lobby from '../Components/Lobby'
import WritingPage from '../Components/WritingPage'
import DrawingPage from '../Components/DrawingPage'
import GuessingPage from '../Components/GuessingPage'
import CustomButton from '../Components/CustomButton'
import UserList from '../Components/UserList'

let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Room(props: any) {

    const GAME_MODE_WRITE = "GAME_MODE_WRITE";
    const GAME_MODE_DRAW = "GAME_MODE_DRAW";
    const GAME_MODE_GUESS = "GAME_MODE_GUESS";
    const GAME_MODE_LOBBY = "GAME_MODE_LOBBY";
    const GAME_MODE_DONE = "GAME_MODE_DONE";


    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ author: "", message: "" }]);
    const [users, setUsers] = useState([]);
    const [gameMode, setGameMode] = useState(GAME_MODE_LOBBY)
    const [guess, setGuess] = useState("");
    const [phrase, setPhrase] = useState("");
    const [allUsersReady, setAllUsersReady] = useState(false);


    const userName = props.location.state.userName;
    const room = props.location.search.split("?id=")[1];

    useEffect(() => {
        socket = io(CONNECTION_PORT);
        socket.emit("join_room", room, userName);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on('roomUsers', ({ users }: any) => {
            setUsers(users);
            setAllUsersReady(checkUsersReady(users));
        });
    });

    useEffect(() => {
        socket.on('send_game_mode', (mode: any) => {
            console.log("received mode " + mode)
            setGameMode(mode);
        });
    });

    const checkGameMode = (mode: string) => {
        if (gameMode === mode) {
            return true;
        } else {
            return false;
        }
    }

    const checkUsersReady = (users: any) => {
        for (let i = 0; i < users.length; i++) {
            if (!users[i].ready) {
                return false;
            }
        }
        return true;
    }

    const setReady = () => {
        socket.emit("set_ready")
    }

    const startGame = () => {
        socket.emit('start_game', room)
    }

    const submit = () => {
        socket.emit('submit')
    }

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
                {/* {checkGameMode(GAME_MODE_WRITE) &&
                <WritingPage setPhrase={setPhrase} />
            }
            {checkGameMode(GAME_MODE_DRAW) &&
                <DrawingPage />
            }
            {checkGameMode(GAME_MODE_GUESS) &&
                <GuessingPage setGuess={setGuess} />
            }
            {checkGameMode(GAME_MODE_LOBBY) ?
                <Lobby startGame={startGame} userName={userName} users={users} setReady={setReady} allUsersReady={allUsersReady} />
                :
                <CustomButton text="Submit" color="green" custom="tw-mt-5" />
            } */}
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