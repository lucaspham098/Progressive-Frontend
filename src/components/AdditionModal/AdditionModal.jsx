import React, { useState } from 'react';
import './AdditionModal.scss'
import CloseBtn from '../CloseBtn/CloseBtn';
import ErrorText from '../ErrorText/ErrorText'

const AdditionModal = ({ heading, handleSubmit, func }) => {

    const [input, setInput] = useState('')
    const [inputError, setInputError] = useState(false)

    const handleChange = (event) => {
        setInput(event.target.value)
        setInputError(false)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if (!input) {
            setInputError(true)
        }
        else {
            handleSubmit(event)
        }
    }

    return (
        <form className='addition-modal' onSubmit={onSubmit} >
            <CloseBtn func={func} />
            <p className='addition-modal__text'> New {heading} Name</p>
            <input type="text" name='name' id="name" placeholder='Input Name' className='addition-modal__input' onChange={handleChange} />
            {inputError && <ErrorText message={'Please fill out name'} isLogin={'error--addition-modal'} />}
            <button className='addition-modal__btn'>Create</button>
        </form>
    );
};

export default AdditionModal;