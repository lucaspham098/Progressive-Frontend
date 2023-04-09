import React from 'react';
import closeBtn from '../../assets/icons/close.svg'
import './CloseBtn.scss'

const CloseBtn = ({ func }) => {
    return (
        <>
            <img src={closeBtn} alt="" className='closeBtn' onClick={func} />
        </>
    );
};

export default CloseBtn;