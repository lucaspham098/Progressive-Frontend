import React from 'react';

const AdditionModal = ({ heading, handleSubmit }) => {



    return (
        <form onSubmit={handleSubmit}>
            <p> New {heading} Name</p>
            <input type="text" name='name' id="name" placeholder='Input Name' />
            <button>Create</button>
        </form>
    );
};

export default AdditionModal;