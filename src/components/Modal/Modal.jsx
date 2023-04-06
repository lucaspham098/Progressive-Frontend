import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import './Modal.scss'
import LineChart from '../LineChart/LineChart';

const Modal = ({ id, name }) => {

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

    function revertDateFormat(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken')

        axios
            .get(`${API_URL}/exercises/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {

                const dataSortedByDate = [...res.data].sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at)
                })

                const dataChronological = [...res.data].sort((a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at)
                })

                setExerciseData(dataSortedByDate)

                const dates = dataSortedByDate.map(item => {
                    return {
                        date: formatDate(item.created_at)
                    }
                })

                dataSortedByDate && setChartData({
                    labels: dataChronological.map(item => formatDate(item.created_at)),
                    datasets: [{
                        label: "Training Volume (lbs)",
                        data: dataChronological.map(item => item.training_volume)
                    }]
                })

                setDateArray(dates.slice(1))

                if (dataSortedByDate.length > 0) {
                    setRecentWeight(dataSortedByDate[0].weight_lbs)
                    setRecentSet1(dataSortedByDate[0].set_1)
                    setRecentSet2(dataSortedByDate[0].set_2)
                    setRecentSet3(dataSortedByDate[0].set_3)
                    setRecentDate(formatDate(dataSortedByDate[0].created_at))
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
    }, [recentWeight, recentSet1, recentSet2, recentSet3, previousWeight, previousSet1, previousSet2, previousSet3]);





    return (
        <div>
            <div className={progress}>
                <h1>{name}</h1>
                <div>{recentDate}</div>
                <div>{recentWeight}</div>
                <div>{recentSet1}</div>
                <div>{recentSet2}</div>
                <div>{recentSet3}</div>
                <div>{recentTrainingVolume}</div>
            </div>

            <div>
                <select name="" id="" onChange={handleDateChange}>
                    <option value="">Please select date</option>
                    {dateArray.map(date => {
                        return (
                            <option key={date.date} value={date.date}>{date.date}</option>
                        )
                    })}
                </select>
                {previousWorkout && previousWorkout.map(workout => {
                    return (
                        <div key={workout.user_id}>
                            <div>{formatDate(workout.created_at)}</div>
                            <div>{workout.weight_lbs}</div>
                            <div>{workout.set_1}</div>
                            <div>{workout.set_2}</div>
                            <div>{workout.set_3}</div>
                        </div>
                    )
                })}
            </div>

            {chartData && <LineChart chartdata={chartData} />}

            {exerciseData && <table id='input-table'>
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
                            <tr key={item.created_at}>
                                <td>{formatDate(item.created_at)}</td>
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

        </div>
    );
};

export default Modal;
