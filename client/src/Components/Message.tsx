function Message({ content, author, userName }: any) {
    let message;
    if (author != "") {
        message =
            <div className="tw-flex tw-justify-center">
                <div className={(author === userName) ? "tw-bg-indigo-300 tw-my-2 tw-rounded tw-p-2" : "tw-bg-yellow-300 tw-my-2 tw-rounded tw-p-2"} style={{ width: "fit-content", height: "fit-content" }}>
                    <h6 className="tw-mb-1">{author}</h6>
                    <div className="tw-text-white">{content}</div>
                </div>
            </div>
    } else {

        message =
            <div className="tw-flex tw-justify-center">
                <div className="tw-bg-red-300 tw-my-2 tw-rounded tw-p-2" style={{ width: "fit-content", height: "fit-content" }}>
                    <div className="tw-text-white">{content}</div>
                </div>
            </div>
    }
    return (
        message
    )
}

export default Message;