


import { Route, Routes } from 'react-router-dom'
import './App.css'

import SignIn from './component/SignIn'
import SignUp from './component/SignUp'
import Navbar from './component/Navbar'
import Tickets from './component/Tickets'
import UsersPage from './component/UsersPage'
import Logout from './component/Logout'
import Admin from './component/Admin'



function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
   
   
    <Route exact path="/signin" element={<SignIn/>}/>
    <Route exact path="/signup" element={<SignUp/>}/>
    <Route exact path="/tickets" element={<Tickets/>}/>
    <Route exact path="/userspage" element={<UsersPage/>}/>
    <Route exact path="/logout" element={<Logout/>}/>
    <Route exact path="/admin" element={<Admin/>}/>
    </Routes>
    </>
  )
}

export default App
