import React, { useEffect, useState } from 'react';
import InputTable from '../components/InputTable/InputTable';
import axios from 'axios';
import { API_URL } from '../utils/utils';

const WorkoutInputPage = () => {

    const [workoutList, setWorkoutList] = useState([])
    const [workoutID, setWorkoutID] = useState('')


    const handleWorkoutChange = (event) => {
        setWorkoutID(event.target.value)
    }


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
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [])


    return (
        <div>
            <h1>{(new Date().getFullYear())}</h1>
            <h2>Workout</h2>
            <select name="" id="" onChange={handleWorkoutChange}>
                <option value="" >please select workout</option>
                {workoutList.map(workout => {
                    return (<option key={workout.id} value={workout.id}>{workout.workout_name}</option>)
                })}
            </select>
            <InputTable workout_id={workoutID} />
        </div>
    );
};

export default WorkoutInputPage;