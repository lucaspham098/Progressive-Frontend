import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import './WorkoutModal.scss'
import axios from 'axios';
import closeBtn from '../../assets/icons/close.svg'
import CloseBtn from '../CloseBtn/CloseBtn';

const WorkoutModal = ({ func }) => {

    const [workoutList, setWorkoutList] = useState([])

    useEffect(() => {

        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setWorkoutList(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
        <div className='workout-modal'>
            <CloseBtn func={func} />
            <p className='workout-modal__heading'>Choose Workout</p>
            <div className="workout-modal__btn-container">
                {workoutList && workoutList.map(item => {
                    return <button className='workout-modal__btn' id={item.id}>{item.workout_name}</button>
                })}
            </div>
        </div>
    );
};

export default WorkoutModal;