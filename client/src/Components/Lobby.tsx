import UserList from '../Components/UserList'
import CustomButton from '../Components/CustomButton'

function Lobby({userName, users, startGame}: any) {
    return (
        <div className="tw-h-5/6">
            <div>Lobby</div>
            <UserList userName={userName} users={users} />
            <CustomButton text="Ready" color="green" onClick={startGame} custom="tw-mt-5" />
        </div>
    )
}

export default Lobby;