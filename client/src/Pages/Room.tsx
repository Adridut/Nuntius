import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import Lobby from '../Components/Lobby'
import WritingPage from '../Components/WritingPage'
import DrawingPage from '../Components/DrawingPage'
import GuessingPage from '../Components/GuessingPage'
import CustomButton from '../Components/CustomButton'

let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Room(props: any) {

    const GAME_MODE_WRITE = "GAME_MODE_WRITE";
    const GAME_MODE_DRAW = "GAME_MODE_DRAW";
    const GAME_MODE_GUESS = "GAME_MODE_GUESS";
    const GAME_MODE_LOBBY = "GAME_MODE_LOBBY";
    const GAME_MODE_DONE = "GAME_MODE_DONE";


    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([{ author: "", message: "" }]);
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
            console.log("received mode")
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
        socket.emit('start_game', room, GAME_MODE_WRITE)
    }

    // useEffect(() => {
    //     socket.on("receive_message", (content: any) => {
    //         setMessages([...messages, content])
    //     });
    // });

    // const sendMessage = () => {
    //     let messageInfo = {
    //         room: room,
    //         content: {
    //             author: userName,
    //             message: message,
    //         }
    //     }

    //     socket.emit("send_message", messageInfo)
    //     setMessages([...messages, messageInfo.content])
    // }


    return (
        <div className="tw-h-5/6">
            <h4 className="tw-flex tw-mt-5 tw-ml-5">{"Room: " + room}</h4>
            {checkGameMode(GAME_MODE_WRITE) &&
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
            }
            {/* <div>
                {messages.map((value, key) => {
                    return <div>{value.author} {value.message}</div>
                })}
            </div>
            <div>
                <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></input>
                <button onClick={sendMessage}>Send</button>
            </div> */}
        </div>
    )

}

export default Room;