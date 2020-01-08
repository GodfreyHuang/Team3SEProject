import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormInput from '../FormInput';
import AuthLayout from './AuthLayout';

import * as CONST from './constents';
import { red_alert, inputType } from '../../utils/configConst';
import { LOGIN } from '../../utils/pathConst';

import AuthAPI from '../../utils/api/apifetcher/auth';
import * as actions from '../../containers/Auth/actions';
import sha256 from 'sha256';

const RegisterForm = props => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [emailAlertMsg, setEmailAlertMsg] = useState('');

    const [password, setPassword] = useState('');
    const [passwordAlertMsg, setPasswordAlertMsg] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordAlertMsg, setConfirmPasswordAlertMsg] = useState('');

    const [username, setUsername] = useState('');
    const [usernameAlertMsg, setUsernameAlertMsg] = useState('');

    const handleInput = e => {
        const { name } = e.target;
        const { value } = e.target;
        switch (name) {
            case CONST.EMAIL:
                setEmail(value);
                break;
            case CONST.PASSWORD:
                setPassword(value);
                break;
            case CONST.CONFIRM_PASSWORD:
                setConfirmPassword(value);
                break;
            case CONST.USERNAME:
                setUsername(value);
                break;
            default:
                break;
        }
    };

    const checkEmailExist = () => {
        if (!email) {
            setEmailAlertMsg('');
            return false;
        }
        return AuthAPI.verifyEmail(email).then(
            () => {
                setEmailAlertMsg(red_alert.REGISTER_EMAIL_EXIST);
                return false;
            },
            () => {
                setEmailAlertMsg('');
                return true;
            }
        );
    };

    const checkUsernameExist = () => {
        if (!username) {
            setUsernameAlertMsg('');
            return false;
        }
        return AuthAPI.verifyUsername(username).then(
            () => {
                setUsernameAlertMsg(red_alert.REGISTER_USERNAME_EXIST);
                return false;
            },
            () => {
                setUsernameAlertMsg('');
                return true;
            }
        );
    };

    const handleSubmit = async e => {
        if ((await checkEmailExist()) && (await checkUsernameExist())) {
            handleRegister();
        }
    };

    const handleRegister = () => {
        AuthAPI.register({ email, password: sha256(password), username }).then(
            res => {
                const { data } = res;

                actions.authSuccess(data)(dispatch);
                props.history.push('/dashboard');
            },
            rej => {
                setUsernameAlertMsg(red_alert.REGISTER_FAIL);
            }
        );
    };

    const handleInputOnblur = async e => {
        const { name } = e.target;
        switch (name) {
            case CONST.EMAIL:
                checkEmailExist();
                break;
            case CONST.USERNAME:
                checkUsernameExist();
                break;
            default:
                break;
        }
    };

    const inputList = [
        {
            name: CONST.EMAIL,
            type: 'text',
            value: email,
            placeholder: CONST.EMAIL_PLACEHOLDER,
            alertMessage: emailAlertMsg,
            inputType: inputType.text_alert
        },
        {
            name: CONST.PASSWORD,
            type: 'password',
            value: password,
            placeholder: CONST.PASSWORD_PLACEHOLDER,
            alertMessage: passwordAlertMsg,
            inputType: inputType.text_alert
        },
        {
            name: CONST.CONFIRM_PASSWORD,
            type: 'password',
            value: confirmPassword,
            placeholder: CONST.CONFIRM_PASSWORD_PLACEHOLDER,
            alertMessage: confirmPasswordAlertMsg,
            inputType: inputType.text_alert
        },
        {
            name: CONST.USERNAME,
            type: 'text',
            value: username,
            placeholder: CONST.USERNAME_PLACEHOLDER,
            alertMessage: usernameAlertMsg,
            inputType: inputType.text_alert
        }
    ];

    return (
        <AuthLayout
            title={CONST.REGISTER_TITLE}
            link={CONST.LOGIN_LINK}
            linkTo={LOGIN}
            submitButtom={CONST.REGISTER_BUTTON}
            handleSubmit={handleSubmit}
            buttonEnable={
                email && password && password === confirmPassword && username
            }
        >
            <FormInput
                inputList={inputList}
                handleInput={handleInput}
                handleInputOnblur={handleInputOnblur}
            />
        </AuthLayout>
    );
};

export default withRouter(RegisterForm);
