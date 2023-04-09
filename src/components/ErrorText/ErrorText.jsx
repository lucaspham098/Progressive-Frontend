import React from 'react';
import './ErrorText.scss'
const ErrorText = ({ message, style }) => {
    return (
        <div className='error-container'>
            <p className={`${style} error`}>{message}</p>
        </div>
    );
};

export default ErrorText;