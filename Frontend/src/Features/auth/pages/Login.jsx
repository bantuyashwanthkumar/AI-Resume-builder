import React from 'react';

const Login = () => {
    return (
        <Card>
            <h1 style={{ color: 'white' }}>Login Page</h1>
            <p>Welcome to the login page!</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </Card>
    );
}

export default Login;