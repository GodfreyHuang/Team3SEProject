import React, { useEffect, useState } from 'react';

import ProfileApi from '../../utils/api/apifetcher/profile';

import './style.scss';

const NameSelector = ({ nameList, handleAdd, handleRemove }) => {
    const [searchNameTimeOut, setSearchTimeout] = useState(null);
    const [name, setName] = useState('');
    const [serachList, setSearchList] = useState([]);
    const [selectIndex, setSelectIndex] = useState(0);

    const handleInput = e => {
        setName(e.target.value);
    };
    useEffect(() => {
        clearTimeout(searchNameTimeOut);
        if (name.length) {
            setSearchTimeout(
                setTimeout(() => {
                    ProfileApi.searchLikeUsername(name).then(
                        res => {
                            setSearchList(res.data);
                            setSelectIndex(res.data.length - 1);
                        },
                        rej => {}
                    );
                }, 300)
            );
        } else {
            setSearchList([]);
        }
    }, [name]);

    const handleAddName = index => {
        handleAdd(serachList[index]);
        setSearchList([]);
        setSelectIndex(0);
        setName('');
    };
    const handleKeyDown = event => {
        if (serachList.length) {
            //up
            if (event.keyCode === 38) {
                setSelectIndex(
                    selectIndex === 0 ? serachList.length - 1 : selectIndex - 1
                );
            }
            //down
            else if (event.keyCode === 40) {
                setSelectIndex(
                    selectIndex === serachList.length - 1 ? 0 : selectIndex + 1
                );
            }
            //Enter
            else if (event.keyCode === 13) {
                handleAddName(selectIndex);
            }
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });
    return (
        <div className="nameSelector relative flex items-center">
            Assign To:&nbsp;
            <div className="absolute nameselector_serachList">
                {serachList.map((e, i) => (
                    <div
                        className={`nameselector_serachList_item cursor-pointer${
                            selectIndex === i
                                ? ' nameselector_serachList_item-select'
                                : ''
                        }`}
                        key={`nameselector_serachList${e}_${i}`}
                        onClick={() => {
                            handleAddName(i);
                        }}
                    >
                        {e}
                    </div>
                ))}
            </div>
            {nameList.map((e, i) => (
                <div
                    className="flex selected_username_tag"
                    key={`nameselector_nameList${e}${i}`}
                >
                    {e}
                    <div
                        data-index={i}
                        className="nameselector_close"
                        onClick={handleRemove}
                    />
                </div>
            ))}
            <input
                type="text"
                value={name}
                onChange={handleInput}
                placeholder="Username"
                className="nameselector_username"
            />
        </div>
    );
};

export default NameSelector;
