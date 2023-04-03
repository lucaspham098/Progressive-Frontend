import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginOrSignup from './pages/LoginOrSignup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login-or-signup' element={<LoginOrSignup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App