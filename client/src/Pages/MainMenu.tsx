import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Components/Modal'
import CustomButton from '../Components/CustomButton'



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
                <CustomButton text="Rules" color="blue" onClick={displayRules} />
            </div>
            <div className="tw-mx-20">
                <Link to="/login" className="tw-bg-none">
                    <CustomButton text="Play" color="green" custom="btn-large" />
                </Link>
            </div>
            <div>
                <CustomButton text="About" color="red" onClick={displayAbout} />
            </div>
        </div>
        {(showRules || showAbout) && <Modal title={showRules ? "Rules" : "About"} content={showRules ? "Some rules..." : "Made with ❤️ by Adrien Dutfoy"} displayModal={closeModal}></Modal>}
    </div>)

}

export default MainMenu;
