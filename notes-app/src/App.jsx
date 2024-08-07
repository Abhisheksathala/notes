import Home from "./Pages/Home/Home"
import Login from './Pages/Login /Login'
import Singup from "./Pages/Singup/Singup"
import Navbar from './Components/Navbar/Navbar'


import { Routes,Route } from "react-router-dom"

const App = () => {



  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={< Login/>} />
        <Route path="/singup" element={< Singup/>} />
      </Routes>   
    </div>
  )
}

export default App