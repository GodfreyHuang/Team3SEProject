import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SIDE_BAR_ITEMS } from './constants';
import './index.scss';

const NavSideBar = props => {
    const [showClosed, setShowClosed] = useState(false);
    return (
        <div className="nav_sidebar bg-gray-300 ">
            <div className="nav_sidebar_container flex flex-col  ">
                {SIDE_BAR_ITEMS.map(item => (
                    <Link
                        key={`sliderBar_${item.name}`}
                        className={`nav_sidebar_link text-black font-bold text-20 hover:bg-gray-400
                         ${showClosed ? 'active_line' : null}`}
                        to={item.path}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavSideBar;
