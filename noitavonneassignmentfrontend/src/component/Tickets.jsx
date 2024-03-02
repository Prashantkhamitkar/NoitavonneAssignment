import React, { useEffect, useState } from 'react'
import instance from './service/Myaxios';

const Tickets = () => {
 const[data,setData]= useState([]);

 useEffect(()=>{
  const fetchData = async () => {
    try {
        const response = await instance.get('/api/ticket/alltickets');
        setData(response.data);
    } catch (error) {
        console.log(error);
    }
};

fetchData();
 
 },[])

 const [selectedStatus, setSelectedStatus] = useState({});
 const handleCheckboxChange = (index, status) => {
  setSelectedStatus((prevState) => {
      return { ...prevState, [index]: status };
  });
};
const handleDelete = (ticketId) => {
  instance.delete(`api/ticket/close/${ticketId}`)
      .then((res) => {
          console.log(res.data);
          // Show success message
          Swal.fire({
              icon: 'success',
              title: 'Ticket Closed!',
              text: 'Ticket Closed successfully.',
              showConfirmButton: false,
              timer: 2000 // Close after 2 seconds
          }).then(() => {
              // Reload the page to fetch the updated data
              window.location.reload();
          });
      })
      .catch((error) => {
          console.error('Error deleting ticket:', error);
          // Show error message
          Swal.fire({
              icon: 'error',
              title: 'Failed!',
              text: 'An error occurred while closing the ticket.',
              confirmButtonText: 'OK'
          });
      });
  
};
    return (
      
     <div className="space-y-4">
      <h1 className='m-10 text-center  font-extrabold'>Supports Page</h1>
      {data.map((item, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-md">
             <h1 className=' text-center  font-extrabold'>{item.created}</h1>
              <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">{item.title}</div>
                  <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                          <input
                              type="checkbox"
                              className="form-checkbox text-indigo-600"
                              checked={selectedStatus[index] === 'close'||item.status=='CLOSED'}
                              onChange={() => handleCheckboxChange(index, 'close')}
                              
                          />
                          <span className="text-sm">Close</span>
                      </label>
                      <label className="flex items-center space-x-2">
                          <input
                              type="checkbox"
                              className="form-checkbox text-indigo-600"
                              checked={selectedStatus[index] === 'resolve'||item.status=='RESOLVED'}
                              
                              onChange={() => handleCheckboxChange(index, 'resolve')}
                          />
                          <span className="text-sm">Resolve</span>
                      </label>
                  </div>
              </div>
              <button
                  className={`flex w-20 justify-center rounded-md bg-indigo-600 px-1 py-1.5 my-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  style={item.status === 'CLOSED' || item.status === 'RESOLVED' ? { pointerEvents: 'none', opacity: 0.5 } : {}}

             onClick={()=>handleDelete(`${item.id}`)}
             >
                  Submit
              </button>
          </div>
      ))}
  </div>)}

export default Tickets;