import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignupPage from './pages/LoginOrSignupPage/LoginOrSignupPage'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage'
import ExerciseProgressionPage from './pages/ExerciseProgressionPage/ExerciseProgressionPage'
function App() {




  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login-signup' element={<LoginOrSignupPage />} />
        <Route path='/exercise-progression' element={<ExerciseProgressionPage />} />
        <Route path='/workouts' element={<WorkoutsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App