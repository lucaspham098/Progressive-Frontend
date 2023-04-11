import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard';
import WorkoutHistoryModal from '../../components/WorkoutHistoryModal/WorkoutHistoryModal';
import AdditionModal from '../../components/AdditionModal/AdditionModal';
import AddExerciseToWorkoutModal from '../../components/AddExerciseToWorkoutModal/AddExerciseToWorkoutModal';
import RemoveExerciseFromWorkoutModal from '../../components/RemoveExerciseFromWorkoutModal/RemoveExerciseFromWorkoutModal';
import './WorkoutsPage.scss'
import Overlay from '../../components/Overlay/Overlay';
import { useNavigate } from 'react-router-dom';

const WorkoutsPage = () => {
    const navigate = useNavigate()

    if (!sessionStorage.getItem('JWTtoken')) {
        navigate('/login-signup')
    }

    const [workouts, setWorkouts] = useState([])
    const [modal, setModal] = useState(false)
    const [workoutName, setWorkoutName] = useState('')
    const [workoutID, setWorokoutID] = useState('')
    const [additonModal, setAdditionModal] = useState(false)
    const [addToWorkoutModal, setAddToWorkoutModal] = useState(false)
    const [removeFromWorkoutModal, setRemoveFromWorkoutModal] = useState(false)
    const [workoutIDExerciseAdd, setWorkoutIDExerciseAdd] = useState('')
    const [workoutIDRemoveExercise, setWorkoutIDRemoveExercise] = useState('')

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
        setWorkoutName(event.currentTarget.dataset.name)
        setWorokoutID(event.currentTarget.id)
        console.log(event.currentTarget.id)
    }

    const handleAddExerciseClick = (event) => {
        event.stopPropagation();
        setAddToWorkoutModal(true)
        setWorkoutIDExerciseAdd(event.target.id)
    }

    const handleRemoveExerciseClick = (event) => {
        event.stopPropagation();
        setRemoveFromWorkoutModal(true)
        setWorkoutIDRemoveExercise(event.target.id)

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

    const handleCloseModal = () => {
        setModal(false)
        setAddToWorkoutModal(false)
        setRemoveFromWorkoutModal(false)
        setAdditionModal(false)
    }

    return (
        <div>
            <h1 className='workouts__title'>Your Workouts</h1>
            <button className='workouts__btn' onClick={() => { setAdditionModal(true) }}>+ Add Workout</button>

            <div className="workouts__cards-container">
                {workouts && workouts.map(workout => {
                    return <WorkoutCard name={workout.workout_name} id={workout.id} key={workout.id} handleClick={handleClick} handleAddExerciseClick={handleAddExerciseClick} handleRemoveExerciseClick={handleRemoveExerciseClick} />
                })}
            </div>

            {modal && <WorkoutHistoryModal workoutName={workoutName} workoutID={workoutID} func={handleCloseModal} />}
            {modal && <Overlay />}

            {addToWorkoutModal && <AddExerciseToWorkoutModal workoutID={workoutIDExerciseAdd} func={handleCloseModal} />}
            {addToWorkoutModal && <Overlay />}

            {removeFromWorkoutModal && <RemoveExerciseFromWorkoutModal workoutID={workoutIDRemoveExercise} func={handleCloseModal} />}
            {removeFromWorkoutModal && <Overlay />}

            {additonModal && <AdditionModal heading='Workout' handleSubmit={handleSubmit} func={handleCloseModal} />}
            {additonModal && <Overlay />}
        </div>
    );

};

export default WorkoutsPage;
