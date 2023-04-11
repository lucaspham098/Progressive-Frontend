import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignup from './pages/LoginOrSignup'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage'
import ExerciseProgressionPage from './pages/ExerciseProgressionPage/ExerciseProgressionPage'
function App() {




  return (
    <BrowserRouter>
      <Footer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login-signup' element={<LoginOrSignup />} />
        <Route path='/exercise-progression' element={<ExerciseProgressionPage />} />
        <Route path='/workouts' element={<WorkoutsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App