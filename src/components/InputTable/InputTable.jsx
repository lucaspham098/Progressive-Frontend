import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/utils';


const InputTable = ({ workout_id }) => {


    const [workout, setWorkout] = useState([])

    useEffect(() => {

        if (!workout_id) return

        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts/${workout_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            .then((res) => {
                console.log(res.data)
                setWorkout(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [workout_id])

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [];
        for (let i = 0; i < workout.length; i++) {
            const exercise_id = workout[i].exercise_id;
            const weight_lbs = formData.get(`weight-${exercise_id}`);
            const set_1 = formData.get(`set1-${exercise_id}`);
            const set_2 = formData.get(`set2-${exercise_id}`);
            const set_3 = formData.get(`set3-${exercise_id}`);
            const comments = formData.get(`comments-${exercise_id}`);
            data.push({ exercise_id, weight_lbs, set_1, set_2, set_3, comments });
        }
        console.log(data)
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .post(`${API_URL}/exercise-data`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    };



    return (
        <form className='input-form' onSubmit={handleSubmit}>
            <table id='input-table'>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Weight (lbs)</th>
                        <th>Set 1</th>
                        <th>Set 2</th>
                        <th>Set 3</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {workout.map(workout => {
                        return (
                            <tr key={workout.exercise_id} exercise_id={workout.exercise_id}>
                                <td>{workout.exercise_name}</td>
                                <td><input type="number" name={`weight-${workout.exercise_id}`} /></td>
                                <td><input type="number" name={`set1-${workout.exercise_id}`} /></td>
                                <td><input type="number" name={`set2-${workout.exercise_id}`} /></td>
                                <td><input type="number" name={`set3-${workout.exercise_id}`} /></td>
                                <td><input type="text" name={`comments-${workout.exercise_id}`} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button>Finish Workout</button>
        </form>
    );
};

export default InputTable;