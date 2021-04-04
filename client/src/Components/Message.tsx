function Message({ content, author, userName }: any) {
    return (

        <div className={(author === userName) ? "tw-bg-indigo-500 tw-my-2 tw-rounded tw-p-2" : "tw-bg-yellow-500 tw-my-2 tw-rounded tw-p-2"} style={{width: "fit-content", height: "fit-content"}}>
            <h6 className="tw-mb-1">{author}</h6>
            <div className="tw-text-white">{content}</div>
        </div>
    )
}

export default Message;