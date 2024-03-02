import React, { useState } from 'react';
import Swal from 'sweetalert2';

import instance from './service/Myaxios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate email and password fields
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email and password are required!',
            });
            return;
        }

        try {
            // Send login request to backend
            const response = await instance.post('api/users/signin', {
                email,
                password,
            });

            // Check response status
            if (response.status === 200) {
                sessionStorage.setItem("login",true);
                sessionStorage.setItem("user",email);
                // Show success message
                console.log(response.data.role)
                sessionStorage.setItem("role",response.data.role)

                Swal.fire({
                    icon: 'success',
                    title: 'Logged In!',
                    text: 'You have successfully logged in.',
                }).then(()=>{
                    if(sessionStorage.getItem("role")==='USER'){
                    navigate("/userspage")
                    window.location.reload();}
                    else if(sessionStorage.getItem("role")==='SUPPORT')
                    {
                        navigate("/tickets")
                        window.location.reload();
                    }
                    else if(sessionStorage.getItem("role")==='ADMIN')
                    {
                        navigate("/admin")
                        window.location.reload();
                    }
                });
                // Redirect user to dashboard or another page
                // Example: history.push('/dashboard');
            } else {
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid email or password!',
                });
            }
        } catch (error) {
            console.error('Error signing in:', error);
            // Show error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while signing in.',
            });
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign In
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
