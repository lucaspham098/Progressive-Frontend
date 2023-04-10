import React, { useEffect, useState } from 'react';
import './AddExerciseToWorkoutModal.scss'
import { API_URL } from '../../utils/utils';
import axios from 'axios';
import CloseBtn from '../CloseBtn/CloseBtn';

const AddExerciseToWorkoutModal = ({ workoutID, func }) => {

    const [availableExercises, setAvailableExercises] = useState([])
    const [listOfExercises, setListOfExercises] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/exercises/no-workout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAvailableExercises(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    })

    const handleSelect = (event) => {
        const id = event.target.id;
        if (listOfExercises.some(exercise => exercise.id === id)) {
            console.log(`Exercise ${id} already exists in list.`);
        } else {
            setListOfExercises([...listOfExercises, { id: id }]);
        }
        event.target.classList.add('add-exercise-modal__exercise--selected')
    }

    const handleAdd = () => {
        const token = sessionStorage.getItem('JWTtoken');

        const reqBody = listOfExercises.map(item => {
            return {
                ...item,
                workout_id: workoutID
            }
        })
        console.log(reqBody)

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
        <div className='add-exercise-modal'>
            <CloseBtn func={func} />
            <p className='add-exercise-modal__title'>Choose Which Exercises to Add</p>
            <div className="add-exercise-modal__exercise-container">
                {availableExercises && availableExercises.map(item => {
                    return (
                        <p key={item.id} id={item.id} onClick={handleSelect} className='add-exercise-modal__exercise'>{item.exercise_name}</p>
                    )
                })}
            </div>
            <button onClick={handleAdd} className='add-exercise-modal__btn'>Add</button>
        </div>
    );
};

export default AddExerciseToWorkoutModal;