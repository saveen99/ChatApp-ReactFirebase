import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


function Login() {
    const [err,setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (error) {
            console.log(error)
            setErr(true);
        }
    }
  return (
    <div className='flex items-center justify-center w-full h-screen text-white bg-purple-600 font-body'>
        <div className='flex flex-col p-3 bg-purple-700 rounded-md shadow-md h-5/6 w-96 '>
            <div className='p-4 text-5xl font-bold text-center'>
                SAVEE
            </div>
            <div className='flex flex-col justify-between h-full '>
                <h2 className='text-2xl text-center text-purple-200'>
                    Login Now
                </h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='flex flex-col p-2'>
                        <label>
                           Enter your email 
                        </label>
                        <input type='text' placeholder='someone@gmail.com' className='px-3 py-1 text-black rounded-md'/>
                    </div>
                    <div className='flex flex-col p-2'>
                        <label>
                            Password
                        </label>
                        <input type='password' placeholder='......' className='px-3 py-1 text-black rounded-md'/>
                    </div>
                    <button className='p-2 m-4 bg-purple-800 rounded-md hover:bg-purple-900 '>Sign up</button>
                    { err && <span className='text-sm text-center text-red-300 -translate-y-3'>Something went wrong !!! </span> }
                </form>
                <h5>
                    You don't have an account <a className='text-purple-200 cursor-pointer hover:text-purple-50'><Link to={'/register'}>Register Now</Link></a> 
                </h5>
            </div>
        </div>
    </div>
  )
}

export default Login
