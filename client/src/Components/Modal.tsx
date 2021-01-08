
import '../App.css';


function Modal({title, content, displayModal}: any) {
    return (
        <div className="tw-w-1/4 tw-h-2/3 border tw-bg-white shadow shadow-large tw-fixed">
            <div className=" tw-flex tw-justify-end " onClick={displayModal}>
                <div className="tw-cursor-pointer tw-text-red-500 tw-m-6 tw-border tw-border-red-500 tw-rounded-full tw-w-6 tw-h-6 tw-flex tw-justify-center tw-items-center">X</div>
            </div>
            <h3>{title}</h3>
            <div>{content}</div>
        </div>
    )
}

export default Modal;