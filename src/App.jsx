import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignup from './pages/LoginOrSignup'
import WorkoutInputPage from './pages/WorkoutInputPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login-or-signup' element={<LoginOrSignup />} />
        <Route path='/workout-input' element={<WorkoutInputPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App