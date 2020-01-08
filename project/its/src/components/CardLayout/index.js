import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';
const Layout = ({ children }) => {
    return (
        <div className="max-w-sm w-full max-w-full flex">
            <div className="w-full border-r border-b border-l border-t border-gray-400 bg-white rounded rounded-b-none rounded-lg border-solid p-8 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                    <div className="cardLayout_header  justify-between  items-center">
                        <div className="cardLayout_title text-20 ">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Layout);
