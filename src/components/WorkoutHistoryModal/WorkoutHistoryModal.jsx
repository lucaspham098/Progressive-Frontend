import React, { useEffect, useState } from 'react';
import './WorkoutHistoryModal.scss'
import axios from 'axios';
import { API_URL } from '../../utils/utils';

const WorkoutHistoryModal = ({ workoutName, workoutID }) => {

    const [workoutArr, setWorkoutArr] = useState([])
    const [loading, setLoading] = useState(true);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return formattedDate;
    }

    function displayDateFormat(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');
        const Arr = []
        axios
            .get(`${API_URL}/exercise-data/dates/${workoutID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {

                const dates = res.data.filter((obj, index, self) =>
                    index === self.findIndex((t) => t.created_at === obj.created_at)
                );
                const dateArr = (dates.map(item => {
                    return formatDate(item.created_at)
                })).reverse()

                const requests = dateArr.map(item => axios.get(`${API_URL}/exercise-data/workouts/${workoutID}/${item}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }))
                Promise.all(requests)
                    .then((responses) => {
                        const data = responses.map((response) => response.data)
                        setWorkoutArr(data)
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            })
            .catch(err => {
                console.log(err.response)
            })

    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }





    return (
        <div className='history-modal'>
            {workoutName}

            {workoutArr && workoutArr.map((item, index) => {
                return (
                    <div key={index}>
                        <div>{displayDateFormat(item[0].created_at)}</div>
                        <table >
                            <thead>
                                <tr>
                                    <th>Exercise</th>
                                    <th>Weight (lbs)</th>
                                    <th>Set 1</th>
                                    <th>Set 2</th>
                                    <th>Set 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.map(item => {
                                    return (
                                        <tr key={item.exercise_name}>
                                            <td>{item.exercise_name}</td>
                                            <td>{item.weight_lbs}</td>
                                            <td>{item.set_1}</td>
                                            <td>{item.set_2}</td>
                                            <td>{item.set_3}</td>
                                            <td>{item.training_volume}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )

            })}
        </div>
    );
};

export default WorkoutHistoryModal;