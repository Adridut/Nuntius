import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

let socket: any;
const CONNECTION_PORT = 'localhost:3001/'

function Login(this: any) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');


    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT])

    const connectToRoom = () => {
        setLoggedIn(true);
        socket.emit("join_room", room);
    }

    return (
        <div>
            {!loggedIn ? (<div>
                    <input type="text" placeholder="Name..." onChange={(e) => setUserName(e.target.value)}/>
                    <input type="text" placeholder="Room id..." onChange={(e) => setRoom(e.target.value)}/>
                    <button onClick={connectToRoom}>Enter Room</button>
                </div>) :
                (<h1>You are logged in</h1>)}
        </div>
    )

}

export default Login;