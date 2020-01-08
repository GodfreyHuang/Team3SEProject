import React from 'react';

import { CANCEL } from './constants';
import PopUp from '../PopUp';

import './styles.scss';

const ConfirmPopUp = ({
    title,
    handleLeftOption,
    handleRightOption,
    leftOption,
    rightOption,
    isActive
}) => {
    return (
        <PopUp>
            <div className="confirmPopUp w-full text-28 text-center bg-white rounded-lg">
                {title}
                <div className="confirmPopUp_button w-full flex justify-center">
                    <span
                        className="main_btn btn-cancel text-28"
                        onClick={handleLeftOption}
                    >
                        {leftOption || CANCEL}
                    </span>
                    <span
                        className={`main_btn btn-active text-28${
                            isActive ? '' : ' disable'
                        }`}
                        onClick={handleRightOption}
                    >
                        {rightOption}
                    </span>
                </div>
            </div>
        </PopUp>
    );
};

export default ConfirmPopUp;
