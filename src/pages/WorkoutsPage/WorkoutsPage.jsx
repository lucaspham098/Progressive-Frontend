import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard';
import WorkoutHistoryModal from '../../components/WorkoutHistoryModal/WorkoutHistoryModal';

const WorkoutsPage = () => {

    const [workouts, setWorkouts] = useState([])
    const [modal, setModal] = useState(false)
    const [workoutName, setWorkoutName] = useState('')
    const [workoutID, setWorokoutID] = useState('')

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

    const handleClick = (event) => {
        setModal(true)
        setWorkoutName(event.target.dataset.name)
        setWorokoutID(event.target.id)
    }

    return (
        <div>
            <h1>Your Workouts</h1>

            {workouts && workouts.map(workout => {
                return <WorkoutCard name={workout.workout_name} id={workout.id} key={workout.id} handleClick={handleClick} />
            })}
            {modal && <WorkoutHistoryModal workoutName={workoutName} workoutID={workoutID} />}
        </div>
    );

};

export default WorkoutsPage;
