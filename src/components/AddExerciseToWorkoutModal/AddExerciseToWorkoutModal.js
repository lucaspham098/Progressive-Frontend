import React, { useEffect, useState } from 'react';
import './AddExerciseToWorkoutModal.scss'
import { API_URL } from '../../utils/utils';
import axios from 'axios';

const AddExerciseToWorkoutModal = ({ workoutID }) => {

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

    }

    return (
        <div className='add-to-workout-modal'>
            {availableExercises && availableExercises.map(item => {
                return (
                    <div key={item.id} id={item.id} onClick={handleSelect}>{item.exercise_name}</div>
                )
            })}
            <button onClick={handleAdd}>add</button>
        </div>
    );
};

export default AddExerciseToWorkoutModal;