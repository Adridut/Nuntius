import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'
import Login from './/Login'
import Room from './/Room'





function MainPage(this: any) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');

    function handleLogin(isLoggedIn: any, room: any, userName: any) {
        setIsLoggedIn(isLoggedIn);
        setRoom(room);
        setUserName(userName);
      }

    if (isLoggedIn) {
        return (
            <Room room={room} userName={userName} onChange={handleLogin}></Room>
        )
    } else {
        return (
            <Login onChange={handleLogin}></Login>
        )
    }

}

export default MainPage;