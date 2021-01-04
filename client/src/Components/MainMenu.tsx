import React from 'react'

function MainMenu() {
    return (<div className="tw-h-5/6 tw-flex tw-justify-center tw-items-center">
        <div className="tw-flex tw-items-center">
            <div>
                <button className="tw-text-blue-500 tw-border-blue-500 hover:tw-bg-blue-500 hover:tw-text-white focus:tw-outline-none">Rules</button>
            </div>
            <div className="tw-mx-20">
                <button className="tw-text-green-500 tw-border-green-500 hover:tw-bg-green-500 hover:tw-text-white btn-large focus:tw-outline-none">Play</button>
            </div>
            <div>
                <button className="tw-text-red-500 tw-border-red-500 hover:tw-bg-red-500 hover:tw-text-white focus:tw-outline-none">About</button>
            </div>
        </div>
    </div>)

}

export default MainMenu;
