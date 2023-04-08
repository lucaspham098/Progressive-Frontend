import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import './WorkoutCard.scss'

const ExerciseCard = ({ name, id, handleClick, handleAddExerciseClick, handleRemoveExerciseClick }) => {

    const [loadWorkout, setLoadWorkout] = useState([])


    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setLoadWorkout(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const handleDelete = () => {

    }


    return (
        <div className='exercise-card' onClick={handleClick} data-name={name} id={id}>
            {name}
            {loadWorkout && loadWorkout.map(item => {
                return <div key={item.exercise_id}>{item.exercise_name}</div>
            })}
            <button id={id} onClick={handleAddExerciseClick}>add exercise</button>
            <button id={id} onClick={handleRemoveExerciseClick}>remove exercise</button>
            <button onClick={handleDelete}>delete</button>
        </div>
    );
};

export default ExerciseCard;