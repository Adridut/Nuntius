import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'

function Login(props: any) {
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');
    const [userError, setUserError] = useState('');
    const [roomError, setRoomError] = useState('');

    function handleLogin() {
        // Here, we invoke the callback with the new value
        if (room && userName) {
            props.onChange(true, room, userName);
        } else {
            if (!userName) {
                setUserError("Username cannot be empty.")
            } else {
                setUserError("")
            }
            if (!room) {
                setRoomError("Room name cannot be empty.")
            } else {
                setRoomError("")
            }
        }
    }


    return (
        <div className="tw-h-5/6">
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div className="tw-w-1/3 tw-flex tw-items-center tw-justify-center">
                    <div>
                        <div className="tw-m-4 tw-mt-8">
                            <input className="focus:tw-border-yellow-500" type="text" placeholder="Username..." onChange={(e) => setUserName(e.target.value)} />
                            <h6 className="tw-text-red-500 tw-h-6">{userError}</h6>
                            <input className="focus:tw-border-red-500 tw-mt-3" type="text" placeholder="Room name..." onChange={(e) => setRoom(e.target.value)} />
                            <h6 className="tw-text-red-500 tw-h-6">{roomError}</h6>
                        </div>
                        <div className="tw-flex tw-justify-center tw-items-center">
                            <CustomButton text="Join Room" color="indigo" onClick={handleLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;