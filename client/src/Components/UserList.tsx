function UserList({ users, userName, setReady }: any) {
    return (
        <div className="tw-flex tw-justify-center tw-h-2/3">
            <div className="border tw-w-1/3 shadow">
                {users.map((user: any, key: any) => {
                    return <div className="tw-flex tw-justify-center tw-m-2">
                        <div className={(user.username === userName) ? "tw-text-blue-500 tw-mr-5" : "tw-mr-5"}>{user.username}</div>
                        {(user.username === userName) ?
                            <div onClick={setReady} className={"tw-ml-5 tw-text-xs tw-cursor-pointer tw-select-none "
                                + (user.ready ? "tw-text-green-500" : "tw-text-red-500")}>
                                {user.ready ? "Ready" : "Not ready"}
                            </div> :
                            <div className={"tw-ml-5 tw-text-xs tw-select-none "
                                + (user.ready ? "tw-text-green-500" : "tw-text-red-500")}>
                                {user.ready ? "Ready" : "Not ready"}
                            </div>}
                    </div>
                })}
            </div>
        </div>
    )
}

export default UserList;