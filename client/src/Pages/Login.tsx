import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'





function Login(props: any) {
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');

    function handleLogin() {
        // Here, we invoke the callback with the new value
        props.onChange(true, room, userName);
    }


    return (
        <div className="tw-h-5/6">
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div className="tw-w-1/3 tw-flex tw-items-center tw-justify-center">
                    <div>
                        <div className="tw-m-4 tw-mt-8">
                            <input className="focus:tw-border-yellow-500 tw-mb-3" type="text" placeholder="Username..." onChange={(e) => setUserName(e.target.value)} />
                            <input className="focus:tw-border-red-500 tw-mt-3" type="text" placeholder="Room name..." onChange={(e) => setRoom(e.target.value)} />
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