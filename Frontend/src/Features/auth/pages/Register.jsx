import React from 'react'
import "../auth.form.scss";
import "../../../style.scss";
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        try {
            await handleRegister({ username, email, password })
            navigate('/login')
        } catch (error) {
            console.error('%c Register Failed', 'color: red; font-weight: bold;', error)
        }
    }

    if (loading) {
        return <h1 style={{ color: 'white', fontSize: '2rem', display: 'block', alignItems: 'center',textAlign: 'center' }}>Loading...</h1>
    }

    return (
        <main>
            <div className='form-container'>
                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)}
                            type="text" id="username" name="username" placeholder='enter your username' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name="email" placeholder='enter your email address' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" name="password" placeholder='enter your password' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password" id="confirmPassword" name="confirmPassword" placeholder='confirm your password' />
                    </div>
                    <button className='button primary-button' type='submit'>Create Account</button>
                    <p className='auth-redirect'>Already have an account? <a href='/login'>Login</a></p>
                </form>
            </div>
        </main>
    )
}

export default Register
