import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import './ExerciseModal.scss'
import CloseBtn from '../CloseBtn/CloseBtn';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import EmptyText from '../EmptyText/EmptyText';


const ExerciseModal = ({ id, name, func, closeExerciseModal }) => {

    const [chartData, setChartData] = useState(null)
    const [exerciseData, setExerciseData] = useState([])
    const [recentWeight, setRecentWeight] = useState(0)
    const [recentSet1, setRecentSet1] = useState('')
    const [recentSet2, setRecentSet2] = useState('')
    const [recentSet3, setRecentSet3] = useState('')
    const [recentDate, setRecentDate] = useState('')
    const [recentTrainingVolume, setRecentTrainingVolume] = useState('')
    const [dateArray, setDateArray] = useState([])
    const [previousWorkout, setPreviousWorkout] = useState(null)
    const [previousWeight, setPreviousWeight] = useState('')
    const [previousSet1, setPreviousSet1] = useState('')
    const [previousSet2, setPreviousSet2] = useState('')
    const [previousSet3, setPreviousSet3] = useState('')
    const [progress, setProgress] = useState('')

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function revertDateFormat(dateString) {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

    function displayDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }


    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken')

        axios
            .get(`${API_URL}/exercises/id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const dataSortedByDate = [...res.data].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })

                const dataChronological = [...res.data].sort((a, b) => {
                    return new Date(a.date) - new Date(b.date)
                })

                setExerciseData(dataSortedByDate)

                const dates = dataSortedByDate.map(item => {
                    return {
                        date: formatDate(item.date)
                    }
                })

                setDateArray(dates.slice(1))


                dataSortedByDate && setChartData(dataChronological.map(item => { return { ...item, date: displayDate(item.date) } }))


                if (dataSortedByDate.length > 0) {
                    setRecentWeight(dataSortedByDate[0].weight_lbs)
                    setRecentSet1(dataSortedByDate[0].set_1)
                    setRecentSet2(dataSortedByDate[0].set_2)
                    setRecentSet3(dataSortedByDate[0].set_3)
                    setRecentDate(formatDate(dataSortedByDate[0].date))
                    setRecentTrainingVolume(dataSortedByDate[0].training_volume)
                }

            })
            .catch((err) => {
                console.error(err.response)
            })

    }, [id])

    const handleDateChange = (event) => {
        console.log(event.target.value)
        const revertedDateFormat = revertDateFormat(event.target.value)
        const token = sessionStorage.getItem('JWTtoken')

        axios
            .get(`${API_URL}/exercise-data/exercise/${id}/${revertedDateFormat}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                console.log(res)
                setPreviousWorkout(res.data)
                setPreviousWeight(res.data[0].weight_lbs)
                setPreviousSet1(res.data[0].set_1)
                setPreviousSet2(res.data[0].set_2)
                setPreviousSet3(res.data[0].set_3)
            })
            .catch(err => {
                console.log(err)
            })
    }



    useEffect(() => {
        if (!!previousWorkout)
            if ((recentWeight * (recentSet1 + recentSet2 + recentSet3)) > (previousWeight * (previousSet1 + previousSet2 + previousSet3))) {
                setProgress('progress');
            } else {
                setProgress('revert');
            }
    }, [recentWeight, recentSet1, recentSet2, recentSet3, previousWeight, previousSet1, previousSet2, previousSet3, previousWorkout]);





    return (
        <div className={`exercise-modal ${closeExerciseModal}`}>
            <div className="exercise-modal__desktop-container">
                <h1 className='exercise-modal__title'>{name}</h1>
                <CloseBtn func={func} />
                {exerciseData.length === 0 && < EmptyText text={`No data recorded for ${name}. Complete a workout that includes ${name} first`} modifier={'empty-text__container--modal'} />}
                {exerciseData.length > 0 && <>
                    <p className='exercise-modal__text'>Compare Most Recent Data to Previous Dates</p>
                    <p className='exercise-modal__table-label'> Most Recent Data From {recentDate}:</p>
                    <table className='exercise-modal__table'>
                        <thead>
                            <tr>
                                <th>Weight (lbs)</th>
                                <th>Set 1</th>
                                <th>Set 2</th>
                                <th>Set 3</th>
                                <th>Training Volume (lbs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={progress}>
                                <td >{recentWeight}</td>
                                <td >{recentSet1}</td>
                                <td >{recentSet2}</td>
                                <td >{recentSet3}</td>
                                <td >{recentTrainingVolume}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <div className="exercise-modal__select-container">
                            <p>Data From: </p>
                            <select name="" id="" onChange={handleDateChange} defaultValue=''>
                                <option disabled value=''>Please select date</option>
                                {dateArray.map(date => {
                                    return (
                                        <option key={date.date} value={date.date}>{date.date}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {previousWorkout && previousWorkout.map(workout => {
                            return (
                                <table className='exercise-modal__table' key={workout.id}>
                                    <thead>
                                        <tr>
                                            <th>Weight (lbs)</th>
                                            <th>Set 1</th>
                                            <th>Set 2</th>
                                            <th>Set 3</th>
                                            <th>Training Volume (lbs)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td >{workout.weight_lbs}</td>
                                            <td >{workout.set_1}</td>
                                            <td >{workout.set_2}</td>
                                            <td >{workout.set_3}</td>
                                            <td >{workout.training_volume}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })}
                    </div>
                    <div className="exercise-modal__chart-container">{chartData &&
                        <LineChart data={chartData}
                            width={375}
                            height={250}
                        >
                            <Line dataKey='training_volume' stroke='#2196F3' strokeWidth={2} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                        </LineChart>}
                    </div>
                    {exerciseData &&
                        <table className='exercise-modal__table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Weight (lbs)</th>
                                    <th>Set 1</th>
                                    <th>Set 2</th>
                                    <th>Set 3</th>
                                    <th>Training Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exerciseData.map(item => {
                                    return (
                                        <tr key={item.date}>
                                            <td>{displayDate(item.date)}</td>
                                            <td>{item.weight_lbs}</td>
                                            <td>{item.set_1}</td>
                                            <td>{item.set_2}</td>
                                            <td>{item.set_3}</td>
                                            <td>{item.training_volume}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>}
                </>}
            </div>


        </div>
    );
};

export default ExerciseModal;
