function UserList({ users, userName }: any) {
    if (window.screen.width >= 525) {
        return (
            <div className="tw-float-left tw-ml-5 tw-mt-5">
                <h4>Participants:</h4>
                {users.map((user: any, key: any) => {
                    return <div className="tw-mt-2 tw-flex tw-ml-1">
                        <div className="tw-mr-1">-</div>
                        <div className={(user.username === userName) ? "tw-text-indigo-500" : "tw-text-yellow-500"}>{user.username}</div>
                    </div>
                })}
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default UserList;