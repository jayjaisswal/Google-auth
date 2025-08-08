import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import GoogleLogin from './components/GoogleLogin.jsx'
import Dashboard from './components/Dashboard.jsx'
import PageNotFound from './components/PageNotFound.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<GoogleLogin/>}/>
        {/* we directly render to Login from homepage */}
        <Route path="/" element={<Navigate to ="/login"/>}/> 
        <Route path="/dashboard" element={<Dashboard/>}/> 
        <Route path="*" element={<PageNotFound/>}/> 
          
     
      </Routes>
    </>
  )
}

export default App
