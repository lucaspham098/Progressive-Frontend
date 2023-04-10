import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import axios from 'axios';
import './RemoveExerciseFromWorkoutModal.scss'
import CloseBtn from '../CloseBtn/CloseBtn';

const RemoveExerciseFromWorkoutModal = ({ workoutID, func }) => {

    const [exerciseList, setExerciseList] = useState([])
    const [listToRemove, setListToRemove] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts/${workoutID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setExerciseList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    const handleSelect = (event) => {
        const id = event.target.id;
        if (listToRemove.some(exercise => exercise.id === id)) {
            console.log(`Exercise ${id} already exists in list.`);
        } else {
            setListToRemove([...listToRemove, { id: id }]);
        }
        event.target.classList.add('remove-exercise-modal__exercise--selected')
    }

    const handleRemove = () => {
        const token = sessionStorage.getItem('JWTtoken');

        const reqBody = listToRemove.map(item => {
            return {
                ...item,
                workout_id: null
            }
        })

        axios
            .patch(`${API_URL}/exercises`, reqBody, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response.data)
            })

        window.location.reload()

    }

    return (
        <div className='remove-exercise-modal'>
            <CloseBtn func={func} />
            <p className='remove-exercise-modal__title'>Choose Which Exercises to Remove</p>
            <div className="remove-exercise-modal__exercise-container">
                {exerciseList && exerciseList.map(item => {
                    return (
                        <div key={item.exercise_id} id={item.exercise_id} onClick={handleSelect} className='remove-exercise-modal__exercise'>{item.exercise_name}</div>
                    )
                })}
            </div>
            <button onClick={handleRemove} className='add-exercise-modal__btn'>Remove</button>
        </div>
    );
};

export default RemoveExerciseFromWorkoutModal;