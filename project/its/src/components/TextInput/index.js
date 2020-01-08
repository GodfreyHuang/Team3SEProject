import React from 'react';

import './style.scss';

const TextInput = ({
    type,
    name,
    onChange,
    value,
    placeholder,
    onblur,
    alertMessage
}) => {
    return (
        <div>
            <input
                className="text_input w-full border-b-2 p-4"
                type={type}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                onBlur={onblur}
            />
            <div className="text_input_alert text-14 text-red-600">
                {alertMessage}
            </div>
        </div>
    );
};

export default TextInput;
