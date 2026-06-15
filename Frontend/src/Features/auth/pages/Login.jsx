import React from 'react';
import "../auth.form.scss";
import "../../../style.scss";
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const { loading, handlelogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handlelogin({ email, password })
            navigate('/')
        } catch (error) {
            console.error('%c Login Failed ❌', 'color: red; font-weight: bold;', error)
        }
    }

    if(loading) {
        return <h1 style={{color: 'white', fontSize: '2rem'}}>Loading...</h1>
    }

    return (
       <main>
          <div className='form-container'>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} 
                           type="email" id="email" name="email" placeholder='enter your email Address'></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} 
                           type="password" id="password" name="password" placeholder='enter your password'></input>
                </div>
                <button className='button primary-button' type='submit'>Login</button>
                <p className='auth-redirect'>Don't have an account? <a href='/register'>Register</a></p>
            </form>
          </div>
       </main>
    );
}

export default Login;