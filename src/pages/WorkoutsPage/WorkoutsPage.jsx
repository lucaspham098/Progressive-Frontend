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
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import EmptyText from '../../components/EmptyText/EmptyText';


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
    const [closeHistoryModal, setCloseHistoryModel] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteName, setDeleteName] = useState('')
    const [deleteID, setDeleteID] = useState('')

    useEffect(() => {

        document.title = 'Progressive | Workouts';


        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setWorkouts(res.data.sort((a, b) => {
                    const A = a.workout_name.toUpperCase()
                    const B = b.workout_name.toUpperCase()
                    if (A < B) {
                        return -1
                    }
                    if (A > B) {
                        return 1
                    }
                    else {
                        return 0
                    }
                }))
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [])

    const handleClick = (event) => {
        setModal(true)
        setWorkoutName(event.currentTarget.dataset.name)
        setWorokoutID(event.currentTarget.id)
        setCloseHistoryModel('')
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
        console.log(event)
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
                window.location.reload()
            })
            .catch(err => {
                console.log(err.response.data)
            })


    }

    const handleCloseModal = () => {
        setAddToWorkoutModal(false)
        setRemoveFromWorkoutModal(false)
        setAdditionModal(false)
    }

    const handleCloseHistoryModal = () => {
        setCloseHistoryModel('history-modal--close')
        setTimeout(() => {
            setModal(false)
        }, 200);
    }

    const handleDeleteClick = (event) => {
        setDeleteModal(true)
        event.stopPropagation()
        setDeleteName(event.target.name)
        setDeleteID(event.target.id)
    }

    const handleDeleteModalClose = () => {
        setDeleteModal(false)
    }

    const handleDelete = (event) => {
        const token = sessionStorage.getItem('JWTtoken');
        const id = event.target.id
        axios
            .delete(`${API_URL}/preset-workouts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                window.location.reload()
                console.log(res.data)

            })
            .catch(err => {
                console.log(err.response.data)
            })


    }

    return (
        <div>
            <div className="workouts__desktop-container">
                <h1 className='workouts__title'>Your Workouts</h1>
                <p className='workouts__text'>Click Card To View Workout History</p>
                <button className='workouts__btn' onClick={() => { setAdditionModal(true) }}>+ Add Workout</button>

                <div className="workouts__cards-container">

                    {workouts.length === 0 && <EmptyText text='No workouts created. Create some workouts and add some exercises to them.' />}
                    {workouts && workouts.sort().map(workout => {
                        return <WorkoutCard name={workout.workout_name} id={workout.id} key={workout.id} handleClick={handleClick} handleAddExerciseClick={handleAddExerciseClick} handleRemoveExerciseClick={handleRemoveExerciseClick} handleDeleteClick={handleDeleteClick} handleDeleteModalClose={handleDeleteModalClose} />
                    })}

                </div>

            </div>

            {modal && <WorkoutHistoryModal workoutName={workoutName} workoutID={workoutID} func={handleCloseHistoryModal} closeHistoryModal={closeHistoryModal} />}
            {modal && <Overlay />}

            {deleteModal && <DeleteModal closeFunc={handleDeleteModalClose} name={deleteName} handleDelete={handleDelete} id={deleteID} />}
            {deleteModal && <Overlay />}

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
