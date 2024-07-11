import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendPasswordResetEmail , updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

function Register() {

    const [err,setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirm_password = e.target[3].value;
        const file = e.target[4].files[0];
        try {
            // creating user
            const res = await createUserWithEmailAndPassword(auth, email, password)
            
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${user_name + date}`);
            
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user,{
                            displayName:user_name,
                            photoURL:downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db,"users",res.user.uid), {
                            uid: res.user.uid,
                            user_name: user_name,
                            email: email,
                            photoURL: downloadURL
                        });
                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");

                    } catch (err1) {
                        console.log(err1);
                        setErr(true);
                    }
                });
            });
        } catch (error) {
            console.log(error)
            setErr(true);
        }
    }

  return (
    <div className='flex items-center justify-center w-full h-screen text-white bg-purple-600 font-body '>
        <div className='flex flex-col p-3 bg-purple-700 rounded-md shadow-md h-5/6 w-96 '>
            <div className='p-4 text-5xl font-bold text-center'>
                SAVEE 
            </div>
            <div className='flex flex-col justify-between h-full '>
                <h2 className='text-2xl text-center text-purple-200'>
                    Register Now
                </h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='flex flex-col p-2'>
                        <label>
                           Display Name 
                        </label>
                        <input type='text' placeholder='your full name' className='px-3 py-1 text-black rounded-md' />
                    </div>
                    <div className='flex flex-col p-2'>
                        <label>
                            Email
                        </label>
                        <input type='email' placeholder='user Name' className='px-3 py-1 text-black rounded-md'/>
                    </div>
                    <div className='flex flex-col p-2'>
                        <label>
                            password
                        </label>
                        <input type='password' placeholder='12343555' className='px-3 py-1 text-black rounded-md'/>
                    </div>
                    <div className='flex flex-col p-2'>
                        <label>
                           Confirm password
                        </label>

                        <input type='password' placeholder='12343555' className='px-3 py-1 text-black rounded-md'/>
                    </div>
                    <div className='px-2 py-1'>
                        <input type='file' style={{display:"none"}} className='px-2 py-1 rounded-md ' id='addAve'/>
                        <label htmlFor="addAve" className='flex items-center gap-2 cursor-pointer '>
                            <img src="./add.png" className='w-10' alt="" />
                            Add an avetor
                        </label>
                    </div>
                    <button className='py-2 m-4 bg-purple-800 rounded-md hover:bg-purple-900'>Sign up</button>
                    { err && <span className='text-sm text-center text-red-300 -translate-y-3'>Something went wrong !!! </span> }
                </form>
                <h5>
                    You have an account <a className='text-purple-200 cursor-pointer hover:text-purple-50'><Link to={'/login'}>Login Now</Link></a> 
                </h5>
            </div>
        </div>
    </div>
  )
}

export default Register
