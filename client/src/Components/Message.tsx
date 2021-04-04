function Message({ content, author, userName }: any) {
    let message;
    if (author != "Nuntius") {
        message = <div className={(author === userName) ? "tw-bg-indigo-500 tw-my-2 tw-rounded tw-p-2" : "tw-bg-yellow-500 tw-my-2 tw-rounded tw-p-2"} style={{ width: "fit-content", height: "fit-content" }}>
            <h6 className="tw-mb-1">{author}</h6>
            <div className="tw-text-white">{content}</div>
        </div>
    } else {

        message = <div className="tw-bg-red-500 tw-my-2 tw-rounded tw-p-2" style={{ width: "fit-content", height: "fit-content" }}>
            <div className="tw-text-white">{content}</div>
        </div>
    }
    return (
        message
    )
}

export default Message;