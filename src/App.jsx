import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignup from './pages/LoginOrSignup'
import WorkoutInputPage from './pages/WorkoutInputPage'
import ComparisonPage from './pages/ComparisonPage'
import LineChart from './components/LineChart/LineChart'
import { useState } from 'react'

function App() {

  const [exerciseData, setExerciseData] = useState({
    labels: [1, 2, 3, 4],
    datasets: [{
      label: 'ya',
      data: [6, 7, 8, 3]
    }]
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={exerciseData && <LineChart chartdata={exerciseData} />} />
        <Route path='/login-or-signup' element={<LoginOrSignup />} />
        <Route path='/workout-input' element={<WorkoutInputPage />} />
        <Route path='/comparison' element={<ComparisonPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App