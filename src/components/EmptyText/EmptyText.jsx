import React from 'react';
import './EmptyText.scss'

const EmptyText = ({ text, modifier }) => {
    return (
        <div className={`empty-text__container ${modifier}`}>
            <p className={`empty-text`}>{text}</p>
        </div>
    );
};

export default EmptyText;