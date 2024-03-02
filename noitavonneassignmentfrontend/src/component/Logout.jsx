import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Logout = () => {
   const navigate=useNavigate();
   useEffect(()=>{
    Swal.fire({
        icon: 'success',
        title: 'Logged Out!',
        text: 'You have successfully logged Out.',
    }).then(()=>{
        
        navigate('/signin');
    });
   },[])
  return (
   <></>
  )
}

export default Logout