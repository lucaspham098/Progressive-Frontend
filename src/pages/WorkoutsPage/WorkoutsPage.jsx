import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';

const WorkoutsPage = () => {

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setWorkouts(res.data)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [])

    return (
        <div>
            <h1>Your Workouts</h1>

            {workouts && workouts.map(workout => {
                return <ExerciseCard name={workout.workout_name} id={workout.id} key={workout.id} />
            })}

        </div>
    );

};

export default WorkoutsPage;
