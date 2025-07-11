import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function registeruser(ev){
        ev.preventDefault();
        
        try{
            axios.post('/register', {name, email, password});
            setRedirect(true);
            alert('User registered successfully');
        } catch(e){
            alert('Error registering user');  
        }
        }

        if(redirect){
            return <Navigate to={'/login'} />
        }
    return  (
        <div className="flex flex-col text-center w-[30rem] border border-gray-400 p-4 rounded-2xl shadow-lg shadow-gray-400 mx-auto my-[5rem] text-gray-500">
            <h1 className="text-3xl font-bold">Register</h1>
            <br />
            <form className="flex flex-col" onSubmit={registeruser}>
            <label htmlFor="text">Name</label>
                <input className="border border-gray-400 rounded-lg p-1" type="text" id="text" name="text" value={name} onChange={ev=>setName(ev.target.value)}/>
            <br />
                <label htmlFor="email">Email</label>
                <input className="border border-gray-400 rounded-lg p-1" type="email" id="email" name="email" value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <br />

                <label htmlFor="password">Password</label>
                <input className="border border-gray-400 rounded-lg p-1" type="password" id="password" name="password" value={password} onChange={ev=> setPassword(ev.target.value)} />
            <br />

                <button className="border bg-black text-white py-2 px-3 rounded-2xl" type="submit">Register</button>

                <div className='text-center'>
                    Already a member? <Link className='underline text-black' to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    )
}