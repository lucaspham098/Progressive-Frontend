import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';

const ExerciseCard = ({ name, id }) => {

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

    return (
        <div>
            {name}
            {loadWorkout && loadWorkout.map(item => {
                return <div key={item.exercise_id}>{item.exercise_name}</div>
            })}
        </div>
    );
};

export default ExerciseCard;