import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import "./registerpage.css"

const RegisterPage = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword]=useState('');
    const {register} =useAuth();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await register(username,email,password);
            navigate('/');
        }catch(error){
            alert('Signup failed: ' + error.response.data.message);
        }
    }
    return (
        <div className='register-container'>
            <div className="register-box">
                <h2><FiChevronRight size={50} color='Blue' /> CodeCollab</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} required />
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <button type='submit'>Signup</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>


            </div>
        </div>
    )
}

export default RegisterPage