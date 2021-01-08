import React, { useState } from 'react'


function MainMenu() {
    const [showRules, setShowRules] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const displayRules = () => {
        setShowRules(true);
        displayModal();
    }

    const displayAbout = () => {
        setShowRules(false);
        displayModal();
    }

    const displayModal = () => {
        setShowModal(!showModal)
    }


    return (<div className="tw-h-5/6 tw-flex tw-justify-center tw-items-center">
        {!showModal ? (<div className="tw-flex tw-items-center">
            <div>
                <button onClick={displayRules} className="tw-text-blue-500 tw-border-blue-500 hover:tw-bg-blue-500 hover:tw-text-white focus:tw-outline-none">Rules</button>
            </div>
            <div className="tw-mx-20">
                <button className="tw-text-green-500 tw-border-green-500 hover:tw-bg-green-500 hover:tw-text-white btn-large focus:tw-outline-none">Play</button>
            </div>
            <div>
                <button onClick={displayAbout} className="tw-text-red-500 tw-border-red-500 hover:tw-bg-red-500 hover:tw-text-white focus:tw-outline-none">About</button>
            </div>
        </div>) : (<div className="tw-w-1/4 tw-h-2/3 border tw-bg-white shadow shadow-large tw-fixed">
            <div className=" tw-flex tw-justify-end " onClick={displayModal}>
                <div className="tw-cursor-pointer tw-text-red-500 tw-m-6 tw-border tw-border-red-500 tw-rounded-full tw-w-6 tw-h-6 tw-flex tw-justify-center tw-items-center">X</div>
            </div>
            <h3>{showRules ? "Rules" : "About"}</h3>
            <div>{showRules ? "Some rules..." : "Made with ❤️ by Adrien Dutfoy"}</div>
        </div>)}
    </div>)

}

export default MainMenu;
