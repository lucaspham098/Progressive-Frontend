import React from 'react';
import './DisplayTable.scss'

const DisplayTable = ({ arr, title }) => {
    return (

        <div className="display-table__container">
            <div className='display-table__title'>{title}</div>
            <table className='display-table'>
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
                    {arr && arr.map(item => {
                        return (
                            <tr key={item.exercise_name}>
                                <td className='display-table__exercise-cell'>{item.exercise_name}</td>
                                <td className='display-table__weight-cell'>{item.weight_lbs}</td>
                                <td className='display-table__set-cell'>{item.set_1}</td>
                                <td className='display-table__set-cell'>{item.set_2}</td>
                                <td className='display-table__set-cell'>{item.set_3}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    );
};

export default DisplayTable;