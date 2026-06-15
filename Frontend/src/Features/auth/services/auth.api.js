import axios from 'axios';

export async function register(username, email, password) {
  try {
    const response = await axios.post('/api/auth/register', {
      username,
      email,
      password,
    },{
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export async function login(email, password) {
  try {
    const response = await axios.post('/api/auth/login', { 
        email, password 
    },{
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export async function logout() {
  try {
    const response = await axios.post('/api/auth/logout', {}, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};

export async function getMe() {
  try {
    const response = await axios.get('/api/auth/get-me', {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};