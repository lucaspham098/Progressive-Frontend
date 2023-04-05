import React from 'react';
import './Button.scss'

const Button = ({ text, func }) => {
    return (
        <div className='button' onClick={func}>
            <p className='button-text'>{text}</p>
        </div>
    );
};

export default Button;