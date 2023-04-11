import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import ExerciseModal from '../../components/ExerciseModal/ExerciseModal';
import AdditionModal from '../../components/AdditionModal/AdditionModal';
import './ExerciseProgressionPage.scss'
import deleteicon from "../../assets/icons/delete.svg"
import Overlay from '../../components/Overlay/Overlay';
import arm from '../../assets/icons/flex.svg'
import { useNavigate } from 'react-router-dom';


const ExerciseProgressionPage = () => {

    const navigate = useNavigate()

    if (!sessionStorage.getItem('JWTtoken')) {
        navigate('/login-signup')
    }

    const [exerciseList, setExerciseList] = useState([])
    const [exerciseID, setExerciseID] = useState('')
    const [exerciseName, setExerciseName] = useState('')
    const [modal, setModal] = useState(false)
    const [additionModal, setAdditiionModal] = useState(false)


    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/exercises`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setExerciseList(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })

    }, [])

    const handleClick = (event) => {
        setExerciseID(event.currentTarget.id)
        setExerciseName(event.currentTarget.dataset.name)
        setModal(true)
    }

    const handleAdd = () => {
        setAdditiionModal(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setAdditiionModal(false)

        const token = sessionStorage.getItem('JWTtoken');

        axios
            .post(`${API_URL}/exercises`, { exercise: event.target.name.value }, {
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

    const handleDelete = (event) => {
        event.stopPropagation();
        const token = sessionStorage.getItem('JWTtoken');
        const id = event.target.id
        console.log(event.target.id)
        axios
            .delete(`${API_URL}/exercises/id/${id}`, {
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
        setAdditiionModal(false)
    }

    return (
        <div>
            <h1 className='exercises__title'>Your Exercises</h1>
            <button onClick={handleAdd} className='exercises__btn'>+ Add New Exercise</button>

            {modal && <ExerciseModal id={exerciseID} name={exerciseName} func={handleCloseModal} />}

            <div className="exercises__cards-container">
                {exerciseList.map(exercise => {
                    return (
                        <div key={exercise.id} id={exercise.id} className='exercises__card'>
                            <img src={deleteicon} alt="delete icon" className='exercises__delete' onClick={handleDelete} id={exercise.id} />
                            <p className="exercises__card-text" onClick={handleClick}>{exercise.exercise_name}</p>
                            <div className='exercises__card-btn' onClick={handleClick} id={exercise.id} data-name={exercise.exercise_name}>
                                <img className='exercises__card-icon' src={arm} alt="arm icon" />
                                <p className='exercises__card-text--small'>View Progression</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {additionModal && <AdditionModal heading='Exercise' handleSubmit={handleSubmit} func={handleCloseModal} />}
            {modal && <Overlay />}
            {additionModal && <Overlay />}

        </div>
    );
};

export default ExerciseProgressionPage;