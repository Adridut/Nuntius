function UserList({ users, userName }: any) {
    return (
        <div className="tw-flex tw-justify-center tw-h-2/3">
            <div className="border tw-w-1/3">
                {users.map((user: any, key: any) => {
                    return <div className={(user.username == userName) ? "tw-text-blue-500" : ""}>{user.username}</div>
                })}
            </div>
        </div>
    )
}

export default UserList;