import React from 'react';
import "../auth.form.scss";
import "../../../style.scss";

const Login = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
       <main>
          <div className='form-container'>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" name="email" placeholder='enter your email Address'></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" name="password" placeholder='enter your password'></input>
                </div>
                <button className='button primary-button' type='submit'>Login</button>
                <p className='auth-redirect'>Don't have an account? <a href='/register'>Register</a></p>
            </form>
          </div>
       </main>
    );
}

export default Login;