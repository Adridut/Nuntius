import UserList from '../Components/UserList'
import CustomButton from '../Components/CustomButton'

function Lobby({userName, users, setReady, startGame, allUsersReady}: any) {
    return (
        <div className="tw-h-5/6">
            <div>Lobby</div>
            <UserList userName={userName} users={users} setReady={setReady}/>
            { allUsersReady && <CustomButton text="Start" color="green" onClick={allUsersReady ? startGame : null} custom="tw-mt-5"/> }
        </div>
    )
}

export default Lobby;