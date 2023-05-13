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
import { LineChart, Line } from 'recharts';
import DeleteModal from '../../components/DeleteModal/DeleteModal';



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
    const [chartData, setChartData] = useState(null)
    const [closeExerciseModal, setCloseExerciseModal] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [exerciseToDelete, setExerciseToDelete] = useState('')
    const [exerciseIDToDelete, setExerciseIDToDelete] = useState('')


    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/exercises`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data)
                setExerciseList(res.data.sort((a, b) => {
                    const A = a.exercise_name.toUpperCase()
                    const B = b.exercise_name.toUpperCase()
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
                const promises = res.data.map((exercise) => {
                    return axios.get(`${API_URL}/exercises/id/${exercise.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                });

                Promise.all(promises)
                    .then((responses) => {
                        const newChartData = responses.map((res) => res.data);
                        setChartData(newChartData);
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                    });
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);


    const handleClick = (event) => {
        setExerciseID(event.currentTarget.id)
        setExerciseName(event.currentTarget.dataset.name)
        setModal(true)
        setCloseExerciseModal('')
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
        event.preventDefault()
        window.location.reload()
    }

    const handleCloseModal = () => {
        setAdditiionModal(false)
    }

    const handleCloseExerciseModal = () => {
        setCloseExerciseModal('exercise-modal--close')
        setTimeout(() => {
            setModal(false)
        }, 200);
    }

    const handleDeleteClick = (event) => {
        event.stopPropagation()
        setDeleteModal(true)
        setExerciseToDelete(event.target.name)
        setExerciseIDToDelete(event.target.id)
    }

    const handleCloseDeleteModal = () => {
        setDeleteModal(false)
    }

    return (
        <div>
            <h1 className='exercises__title'>Your Exercises</h1>
            <button onClick={handleAdd} className='exercises__btn'>+ Add New Exercise</button>

            {modal && <ExerciseModal id={exerciseID} name={exerciseName} func={handleCloseExerciseModal} closeExerciseModal={closeExerciseModal} />}
            {deleteModal && <DeleteModal closeFunc={handleCloseDeleteModal} name={exerciseToDelete} handleDelete={handleDelete} id={exerciseIDToDelete} />}

            <div className="exercises__cards-container">
                {chartData && exerciseList.map((exercise, index) => {
                    return (
                        <div key={exercise.id} id={exercise.id} className='exercises__card' onClick={handleClick} >
                            <img src={deleteicon} alt="delete icon" className='exercises__delete' onClick={handleDeleteClick} id={exercise.id} name={exercise.exercise_name} />
                            <p className="exercises__card-text">{exercise.exercise_name}</p>
                            <div className="exercises__card-chart-container">
                                <LineChart data={chartData[index].sort((a, b) => {
                                    const dateA = new Date(a.date)
                                    const dateB = new Date(b.date)
                                    return dateA - dateB
                                })}
                                    width={150} height={100} >
                                    <Line dataKey='training_volume' stroke='#2196F3' strokeWidth={2} />
                                </LineChart>
                            </div>
                            <div className='exercises__card-btn' id={exercise.id} data-name={exercise.exercise_name}>
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
            {deleteModal && <Overlay />}

        </div>
    );
};

export default ExerciseProgressionPage;