import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Components/Modal'


function MainMenu() {
    const [showRules, setShowRules] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const displayRules = () => {
        setShowRules(true);
    }

    const displayAbout = () => {
        setShowAbout(true);
    }

    const closeModal = () => {
        setShowRules(false);
        setShowAbout(false);
    }



    return (<div className="tw-h-5/6 tw-flex tw-justify-center tw-items-center">
        <div className="tw-flex tw-items-center">
            <div>
                <button onClick={displayRules} className="tw-text-blue-500 tw-border-blue-500 hover:tw-bg-blue-500 hover:tw-text-white focus:tw-outline-none">Rules</button>
            </div>
            <div className="tw-mx-20">
                <Link to="/login" className="tw-bg-none">
                    <button className="tw-text-green-500 tw-border-green-500 hover:tw-bg-green-500 hover:tw-text-white btn-large focus:tw-outline-none">Play</button>
                </Link>
            </div>
            <div>
                <button onClick={displayAbout} className="tw-text-red-500 tw-border-red-500 hover:tw-bg-red-500 hover:tw-text-white focus:tw-outline-none">About</button>
            </div>
        </div>
        {(showRules || showAbout) && <Modal title={showRules ? "Rules" : "About"} content={showRules ? "Some rules..." : "Made with ❤️ by Adrien Dutfoy"} displayModal={closeModal}></Modal>}
    </div>)

}

export default MainMenu;
