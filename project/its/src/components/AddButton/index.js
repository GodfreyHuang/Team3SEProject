import React from 'react';
import './style.scss';

import ADD from '../../utils/image/add.svg';

const AddButton = ({ action, wording }) => {
    return (
        <div
            className="addButton_container main_btn btn-sm btn-active flex "
            onClick={action}
        >
            <img className="addButton_img h-full" src={ADD} />
            {wording}
        </div>
    );
};

export default AddButton;
