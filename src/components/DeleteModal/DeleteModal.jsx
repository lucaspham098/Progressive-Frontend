import React from 'react';
import CloseBtn from '../CloseBtn/CloseBtn';

const DeleteModal = ({ handleDelete, closeFunc, name, id }) => {
    return (
        <form className='addition-modal' onSubmit={handleDelete} id={id}>
            <CloseBtn func={closeFunc} />
            <p className='addition-modal__text'> Would You Like To Delete {name}?</p>
            <button className='addition-modal__btn'>Delete</button>
        </form>
    );
};

export default DeleteModal;