import React from 'react';
import './AdditionModal.scss'
import CloseBtn from '../CloseBtn/CloseBtn';

const AdditionModal = ({ heading, handleSubmit, func }) => {



    return (
        <form className='addition-modal' onSubmit={handleSubmit}>
            <CloseBtn func={func} />
            <p className='addition-modal__text'> New {heading} Name</p>
            <input type="text" name='name' id="name" placeholder='Input Name' className='addition-modal__input' />
            <button className='addition-modal__btn'>Create</button>
        </form>
    );
};

export default AdditionModal;