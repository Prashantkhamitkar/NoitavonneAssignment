import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from './service/Myaxios';
import Swal from 'sweetalert2';

const UsersPage = () => {
    const [state, setState] = useState(false);
    const [show, setShow] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [buttonState, setButtonState] = useState(true);
    const navigation = useNavigate();
    const [title, setTitleName] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const created = sessionStorage.getItem("user");
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/api/ticket/user/${created}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function to fetch data
    }, [created]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setButtonState(true);
        // Form validation
        if (!title || !description) {
            setError('All fields are required');
            return;
        }

        // Create a new ticket object
        const newTicket = {
            title,
            description,
            created,
        };

        // Update the user data array
        instance.post('api/ticket/create', newTicket)
            .then((res) => {
                console.log(res.data);

                // Show SweetAlert for success
                Swal.fire({
                    icon: 'success',
                    title: 'Ticket Raised Successful!',
                    text: 'You have successfully submitted.',
                    showConfirmButton: false,
                    timer: 2000 // Close after 2 seconds
                }).then(() => {
                    navigation("/userspage");
                    setState(false);
                    setShow(true);
                    window.location.reload();
                });
            })
            .catch((e) => {
                console.log(e);
                // Show SweetAlert for error
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'An error occurred while submitting.',
                    confirmButtonText: 'OK'
                });
            });

        // Clear form fields and reset error
        setTitleName('');
        setDescription('');
        setError('');
    };

    const handleclick = () => {
        setState(true);
        setButtonState(false);
        setShow(false);
    };

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
                    text: 'An error occurred while deleting the ticket.',
                    confirmButtonText: 'OK'
                });
            });
        
};


    return (
        <div>
            {buttonState && (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-[50px] rounded" onClick={handleclick}>
                    Raise Tickets
                </button>
            )}
            {state && (
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Raise Tickets
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitleName(e.target.value)}
                                        autoComplete="title"
                                        required
                                        className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Descriptions
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="description"
                                        name="description"
                                        type="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        autoComplete="description"
                                        required
                                        className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="created" className="block text-sm font-medium leading-6 text-gray-900">
                                    CreatedBy 
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="created"
                                        name="created"
                                        type="created"
                                        value={created}
                                        autoComplete="created"
                                        readOnly
                                        className="text-center px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>

                            {error && <div className="text-red-600">{error}</div>}
                        </form>
                    </div>
                </div>
            )}
            {show && (
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="border border-gray-200 p-4 rounded-md">
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
                </div>
            )}
        </div>
    );
};

export default UsersPage;
