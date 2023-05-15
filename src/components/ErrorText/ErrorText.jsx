import React from 'react';
import './ErrorText.scss'
const ErrorText = ({ message, isLogin }) => {
    return (
        <div className='error-container'>
            <p className={`${isLogin} error`}>{message}</p>
        </div>
    );
};

export default ErrorText;