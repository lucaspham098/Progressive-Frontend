import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import './InputTable.scss'
import ErrorText from '../ErrorText/ErrorText'
import Timer from '../Timer/Timer';
import EmptyText from '../EmptyText/EmptyText'



const InputTable = ({ workout_id, getExerciseHistory, setExerciseName }) => {

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
                res.data.sort((a, b) => {
                    const nameA = a.exercise_name.toLowerCase();
                    const nameB = b.exercise_name.toLowerCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
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
        const workoutID = workout_id
        for (let i = 0; i < workout.length; i++) {
            const exercise_id = workout[i].exercise_id;
            const weight_lbs = formData.get(`weight-${exercise_id}`);
            const workout_id = workoutID
            const set_1 = formData.get(`set1-${exercise_id}`);
            const set_2 = formData.get(`set2-${exercise_id}`);
            const set_3 = formData.get(`set3-${exercise_id}`);
            const total_reps = parseInt(set_1) + parseInt(set_2) + parseInt(set_3);
            const training_volume = weight_lbs * total_reps;

            if (!weight_lbs || !set_1 || !set_2 || !set_3) {
                setSubmitError(true)
                return
            }

            data.push({ exercise_id, weight_lbs, workout_id, set_1, set_2, set_3, training_volume });
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
        <>

            {workout.length > 0 ? <form onSubmit={handleSubmit}>
                <p className='input-table__text'>Click on exercise name to view exercise history</p>
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
                                        <td className='input-table__exercise-name' onClick={() => {
                                            setExerciseName(workout.exercise_name)
                                            getExerciseHistory(workout.exercise_id)
                                        }}
                                        >
                                            {workout.exercise_name}
                                        </td>
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
            </form> : <EmptyText text={'No exercises assigned to this workout. Add exercises to this workout first.'} />}

        </>
    );
};

export default InputTable;