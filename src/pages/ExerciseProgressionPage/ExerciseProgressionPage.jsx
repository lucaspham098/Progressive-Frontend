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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';



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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    return (
        <div>
            <h1 className='exercises__title'>Your Exercises</h1>
            <button onClick={handleAdd} className='exercises__btn'>+ Add New Exercise</button>

            {modal && <ExerciseModal id={exerciseID} name={exerciseName} func={handleCloseModal} />}

            <div className="exercises__cards-container">
                {chartData && exerciseList.map((exercise, index) => {
                    console.log(chartData[0])
                    return (
                        <div key={exercise.id} id={exercise.id} className='exercises__card'>
                            <img src={deleteicon} alt="delete icon" className='exercises__delete' onClick={handleDelete} id={exercise.id} />
                            <p className="exercises__card-text">{exercise.exercise_name}</p>
                            <div className="exercises__card-chart-container">
                                <LineChart data={chartData[index].sort((a, b) => {
                                    const dateA = new Date(a.date)
                                    const dateB = new Date(b.date)
                                    return dateA - dateB
                                })}
                                    width={150} height={100} >
                                    <Line dataKey='training_volume' stroke='#2196F3' strokeWidth={1} />
                                    {/* <XAxis label="" />
                                    <YAxis label="" /> */}
                                </LineChart>
                            </div>
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