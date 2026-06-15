import React from 'react'
import "../auth.form.scss";
import "../../../style.scss";

const Register = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <main>
            <div className='form-container'>
                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input type="text" id="username" name="username" placeholder='enter your username' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input type="email" id="email" name="email" placeholder='enter your email address' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type="password" id="password" name="password" placeholder='enter your password' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder='confirm your password' />
                    </div>
                    <button className='button primary-button' type='submit'>Create Account</button>
                    <p className='auth-redirect'>Already have an account? <a href='/login'>Login</a></p>
                </form>
            </div>
        </main>
    )
}

export default Register
