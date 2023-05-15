import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import './InputTable.scss'
import ErrorText from '../ErrorText/ErrorText'
import Timer from '../Timer/Timer';


const InputTable = ({ workout_id }) => {

    const [workout, setWorkout] = useState([])
    const [submitError, setSubmitError] = useState(false)

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
            const total_reps = parseInt(set_1) + parseInt(set_2) + parseInt(set_3);
            const training_volume = weight_lbs * total_reps;
            data.push({ exercise_id, weight_lbs, set_1, set_2, set_3, training_volume });
        }
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .post(`${API_URL}/exercise-data`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setSubmitError(false)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err.response.data)
                setSubmitError(true)
                return
            })
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="input-table__container">
                {workout.length > 0 && <div className='input-table__title'>{workout[0].workout_name}</div>}
                <table className='input-table'>
                    <thead className='input-table__head'>
                        <tr >
                            <th>Exercise</th>
                            <th>Weight (lbs)</th>
                            <th>Set 1</th>
                            <th>Set 2</th>
                            <th>Set 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workout.map(workout => {
                            return (
                                <tr key={workout.exercise_id} exercise_id={workout.exercise_id}>
                                    <td>{workout.exercise_name}</td>
                                    <td><input className='input-table__input' type="number" name={`weight-${workout.exercise_id}`} /></td>
                                    <td><input className='input-table__input' type="number" name={`set1-${workout.exercise_id}`} /></td>
                                    <td><input className='input-table__input' type="number" name={`set2-${workout.exercise_id}`} /></td>
                                    <td><input className='input-table__input' type="number" name={`set3-${workout.exercise_id}`} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {submitError && <ErrorText message='Make sure all fields are filled' />}
            <div className="input-table__btn-container">
                <Timer />
                <button className='input-table__btn'>Finish Workout</button>
            </div>
        </form>
    );
};

export default InputTable;