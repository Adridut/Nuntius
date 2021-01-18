function UserList({ users, userName }: any) {
    return (
        <div className="tw-flex tw-justify-center tw-h-2/3">
            <div className="border tw-w-1/3">
                {users.map((user: any, key: any) => {
                    return <div className="tw-flex tw-justify-center tw-m-2">
                        <div className={(user.username == userName) ? "tw-text-blue-500 tw-mr-5" : "tw-mr-5"}>{user.username}</div>
                        <div className={(user.ready) ? "tw-text-green-500 tw-ml-5 tw-text-xs" : "tw-text-red-500 tw-ml-5 tw-text-xs"}>{user.ready ? "Ready" : "Not ready"}</div>
                        </div>
                })}
            </div>
        </div>
    )
}

export default UserList;