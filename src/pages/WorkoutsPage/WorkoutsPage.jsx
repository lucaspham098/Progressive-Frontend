import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard';
import WorkoutHistoryModal from '../../components/WorkoutHistoryModal/WorkoutHistoryModal';
import AdditionModal from '../../components/AdditionModal/AdditionModal';
import AddExerciseToWorkoutModal from '../../components/AddExerciseToWorkoutModal/AddExerciseToWorkoutModal';


const WorkoutsPage = () => {

    const [workouts, setWorkouts] = useState([])
    const [modal, setModal] = useState(false)
    const [workoutName, setWorkoutName] = useState('')
    const [workoutID, setWorokoutID] = useState('')
    const [additonModal, setAdditionModal] = useState(false)
    const [addToWorkoutModal, setAddToWorkoutModal] = useState(false)
    const [workoutIDExerciseAdd, setWorkoutIDExerciseAdd] = useState('')

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

    const handleAddExerciseClick = (event) => {
        setAddToWorkoutModal(true)
        setWorkoutIDExerciseAdd(event.target.id)
        console.log(event.target.id)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setAdditionModal(false)

        const token = sessionStorage.getItem('JWTtoken');

        axios
            .post(`${API_URL}/preset-workouts`, { workout_name: event.target.name.value }, {
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
            <h1>Your Workouts</h1>
            <button onClick={() => { setAdditionModal(true) }}>add new workout</button>
            {additonModal && <AdditionModal heading='Workout' handleSubmit={handleSubmit} />}
            {workouts && workouts.map(workout => {
                return <WorkoutCard name={workout.workout_name} id={workout.id} key={workout.id} handleClick={handleClick} handleAddExerciseClick={handleAddExerciseClick} />
            })}
            {modal && <WorkoutHistoryModal workoutName={workoutName} workoutID={workoutID} />}
            {addToWorkoutModal && <AddExerciseToWorkoutModal workoutID={workoutIDExerciseAdd} />}
        </div>
    );

};

export default WorkoutsPage;
