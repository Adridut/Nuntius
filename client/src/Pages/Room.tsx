import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import DrawPanel from '../Components/DrawPanel'
import UserList from '../Components/UserList'



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

    const userName = props.location.state.userName;
    const room = props.location.search.split("?id=")[1];

    useEffect(() => {
        socket = io(CONNECTION_PORT);
        socket.emit("join_room", room, userName);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on('roomUsers', ({ room, users }: any) => {
            setUsers(users);
        });
    });

    useEffect(() => {
        socket.on('send_game_mode', (mode: any) => {
            console.log("received mode")
            setGameMode(mode);
        });
    });

    const checkGameMode = (mode: string) => {
        if (gameMode == mode) {
            return true;
        } else {
            return false;
        }
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
            {checkGameMode(GAME_MODE_LOBBY) &&
                <div className="tw-h-5/6">
                    <UserList userName={userName} users={users}/>
                    <button onClick={startGame}
                        className="tw-text-green-500 tw-border-green-500 hover:tw-bg-green-500 hover:tw-text-white focus:tw-outline-none tw-mt-8">
                        Start</button>

                </div>
            }
            {checkGameMode(GAME_MODE_WRITE) &&
                <div>
                    <input className="focus:tw-border-red-500 tw-ml-2" type="text" placeholder="Sentence you want your friends to guess..." onChange={(e) => setPhrase(e.target.value)} />
                    <button onClick={startGame}
                        className="tw-text-green-500 tw-border-green-500 hover:tw-bg-green-500 hover:tw-text-white focus:tw-outline-none tw-mt-5">
                        Submit</button>
                </div>
            }
            {checkGameMode(GAME_MODE_DRAW) &&
                <div>
                    <div>Phrase to guess</div>
                    <DrawPanel></DrawPanel>
                    <button onClick={startGame}
                        className="tw-text-green-500 tw-border-green-500 hover:tw-bg-green-500 hover:tw-text-white focus:tw-outline-none tw-mt-5">
                        Submit</button>
                </div>
            }
            {checkGameMode(GAME_MODE_GUESS) &&
                <div>
                    <input className="focus:tw-border-red-500 tw-ml-2" type="text" placeholder="Guess what the drawing represents..." onChange={(e) => setGuess(e.target.value)} />
                    <button onClick={startGame}
                        className="tw-text-green-500 tw-border-green-500 hover:tw-bg-green-500 hover:tw-text-white focus:tw-outline-none tw-mt-5">
                        Submit</button>
                </div>
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