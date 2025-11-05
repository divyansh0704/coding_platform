import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./loginpage.css"

const LoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login} =useAuth();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await login(email,password);
            navigate("/");
        }catch(error){
            alert('Login failed: '+ error.response.data.message);

        }
    }
  return (
    <div className='login-container'>
                <div className="login-box">
                    <h2><FiChevronRight size={50} color='Blue' /> CodeCollab</h2>
                    <form onSubmit={handleSubmit}>
                        
                        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                        <button type='submit'>Signin</button>
                    </form>
                    <p>Don't have any account? <a href="/signup">Sign up</a></p>
    
    
                </div>
            </div>
  )
}

export default LoginPage