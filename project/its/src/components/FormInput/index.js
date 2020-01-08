import React from 'react';

import TextInput from '../TextInput';
import RichEditor from './RichEditor';
import { inputType } from '../../utils/configConst';

import './style.scss';

const FormInput = ({ handleInput, inputList, handleInputOnblur }) => {
    return (
        <React.Fragment>
            {inputList.map(e => {
                const renderInput = () => {
                    if (e.inputType === inputType.text_alert)
                        return (
                            <TextInput
                                name={e.name}
                                type={e.type}
                                onChange={handleInput}
                                value={e.value}
                                placeholder={e.placeholder}
                                alertMessage={e.alertMessage}
                                onblur={handleInputOnblur}
                            />
                        );
                    if (e.inputType === inputType.text)
                        return (
                            <input
                                className="formInput_text w-full"
                                name={e.name}
                                type={e.type}
                                onChange={handleInput}
                                value={e.value}
                                placeholder={e.placeholder}
                                onBlur={handleInputOnblur}
                            />
                        );
                    if (e.inputType === inputType.textarea) {
                        return (
                            <textarea
                                className="formInput_textarea w-full"
                                name={e.name}
                                onChange={handleInput}
                                value={e.value}
                                placeholder={e.placeholder}
                            />
                        );
                    }
                    if (e.inputType === inputType.radio) {
                        return (
                            <div className="formInput_radio_container flex flex-wrap">
                                {e.option.map((radioOption, index) => {
                                    const isChecked =
                                        index === parseInt(e.value);
                                    return (
                                        <div
                                            key={`formInput_radio${radioOption}${index}`}
                                            className="formInput_radio_layout flex relative"
                                        >
                                            <div
                                                className={`formInput_radio  rounded-full border-main border-solid ${
                                                    isChecked
                                                        ? 'border-5 bg-white'
                                                        : 'border-2'
                                                }`}
                                            >
                                                <input
                                                    className="absolute top-0 left-0 w-full h-full opacity-0"
                                                    type="radio"
                                                    name={e.name}
                                                    value={index}
                                                    checked={isChecked}
                                                    onChange={handleInput}
                                                />
                                            </div>
                                            {radioOption}
                                        </div>
                                    );
                                })}
                                <br />
                            </div>
                        );
                    }
                    if (e.inputType === inputType.select) {
                        return (
                            <select
                                name={e.name}
                                onChange={handleInput}
                                value={e.value}
                                className="select_style"
                            >
                                {e.option.map((optionPlaceHolder, i) => {
                                    return (
                                        <option
                                            value={i}
                                            key={`${e.name}_${i}_${optionPlaceHolder}`}
                                        >
                                            {optionPlaceHolder}
                                        </option>
                                    );
                                })}
                            </select>
                        );
                    }
                    if (e.inputType === inputType.editor) {
                        return (
                            <RichEditor
                                value={e.value}
                                handleInput={e.handleInput}
                            />
                        );
                    }
                    return '';
                };
                return (
                    <React.Fragment key={`formInput${e.name}`}>
                        {e.title ? (
                            <div className="formInput_title font-semibold">
                                {e.title}
                            </div>
                        ) : null}
                        {renderInput()}
                        <div className="mb-5"></div>
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
};

export default FormInput;
