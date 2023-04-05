import React, { useEffect } from 'react';
import './WorkoutModal.scss'

const WorkoutModal = ({ heading }) => {

    useEffect(() => {

    })

    return (
        <div className='workout-modal'>
            <p className='workout-modal__heading'>{heading}</p>
        </div>
    );
};

export default WorkoutModal;