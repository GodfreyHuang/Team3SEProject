import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import './auth.scss';

const AuthLayout = ({
    title,
    children,
    linkTo,
    la,
    link,
    buttonEnable,
    handleSubmit,
    submitButtom
}) => {
    return (
        <div className="auth_layout text-18 flex justify-center items-center w-full h-full min-h-screen bg-blue-400">
            <div className="auth_form mx-auto w-full bg-white rounded">
                <div className="auth_form_title text-blue-600 text-28 inline-block">
                    {title}
                </div>
                {children}
                <Link
                    className="auth_bottom_link text-blue-600 text-14 block"
                    to={linkTo}
                ></Link>
                <Link
                    className="auth_bottom_link text-blue-600 text-14 block"
                    to={linkTo}
                >
                    {link}
                </Link>
                <span
                    className={`main_btn btn-active btn-sm inline-block${
                        buttonEnable ? '' : ' disable'
                    }`}
                    onClick={handleSubmit}
                >
                    {submitButtom}
                </span>
            </div>
        </div>
    );
};

export default AuthLayout;
