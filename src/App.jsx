import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignup from './pages/LoginOrSignup'
import WorkoutInputPage from './pages/WorkoutInputPage'
import ComparisonPage from './pages/ComparisonPage'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import WorkoutsPage from './pages/HomePage/HomePage'
function App() {




  return (
    <BrowserRouter>
      <Footer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login-signup' element={<LoginOrSignup />} />
        <Route path='/workout-input' element={<WorkoutInputPage />} />
        <Route path='/comparison' element={<ComparisonPage />} />
        <Route path='/workouts' element={<WorkoutsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App