import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import axios from 'axios';

const RemoveExerciseFromWorkoutModal = ({ workoutID }) => {

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
        <div>
            {exerciseList && exerciseList.map(item => {
                return (
                    <div key={item.exercise_id} id={item.exercise_id} onClick={handleSelect}>{item.exercise_name}</div>
                )
            })}
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default RemoveExerciseFromWorkoutModal;