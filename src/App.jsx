import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignup from './pages/LoginOrSignup'
import WorkoutInputPage from './pages/WorkoutInputPage'
import ComparisonPage from './pages/ComparisonPage'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'

function App() {




  return (
    <BrowserRouter>
      <Footer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login-or-signup' element={<LoginOrSignup />} />
        <Route path='/workout-input' element={<WorkoutInputPage />} />
        <Route path='/comparison' element={<ComparisonPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App