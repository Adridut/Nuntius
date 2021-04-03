import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'





function Login(this: any) {
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');


    return (
        <div className="tw-h-5/6">
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div className="border shadow tw-w-1/3 tw-flex tw-items-center tw-justify-center">
                    <div>
                        <div className="tw-flex tw-m-4 tw-mt-8">
                            <input className="focus:tw-border-yellow-500 tw-mr-2" type="text" placeholder="Username..." onChange={(e) => setUserName(e.target.value)} />
                            <input className="focus:tw-border-red-500 tw-ml-2" type="text" placeholder="Room name..." onChange={(e) => setRoom(e.target.value)} />
                        </div>
                        <Link className="tw-bg-none tw-flex tw-justify-center tw-items-center" to={{ pathname: "/room", search: "?id=" + room, state: { userName: userName } }}>
                            <CustomButton text="Join Room" color="indigo" custom="tw-m-5 tw-mb-8" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;