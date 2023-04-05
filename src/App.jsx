import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignup from './pages/LoginOrSignup'
import WorkoutInputPage from './pages/WorkoutInputPage'
import ComparisonPage from './pages/ComparisonPage'
import LineChart from './components/LineChart/LineChart'
import { useState } from 'react'
import Footer from './components/Footer/Footer'

function App() {




  return (
    <BrowserRouter>
      <Footer />
      <Routes>
        <Route path='/' />
        <Route path='/login-or-signup' element={<LoginOrSignup />} />
        <Route path='/workout-input' element={<WorkoutInputPage />} />
        <Route path='/comparison' element={<ComparisonPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App