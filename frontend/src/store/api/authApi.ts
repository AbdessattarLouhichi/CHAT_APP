import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios_config'

interface data {
  token: string;
  values: any;
  // whatever else is in the JWT.
}



// Register Action 
export const register = createAsyncThunk('auth/register', async (values) => {
  try {
    const response = await axios.post('/register', values)
     return response.data.message
  } catch (error) {
    console.log((error as Error).message)
  }
})
 


// Login
export const login = createAsyncThunk('auth/login', async (values) => {
  try {
    const response = await axios.post('/login', values)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('id', response.data.id)
    return response.data
  } catch (error) {
    console.log((error as Error).message)
  }
})
// Logout 
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axios.get('/logout')
     return response.data
  } catch (error) {
    console.log((error as Error).message)
  }
})

// Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
  try {
    const response = await axios.post('/forgotPassword', email)
     return response.data.message
  } catch (error ) {
    console.log((error as Error).message)
  }
})

// Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (data : data) => {
  try {
    const response = await axios.post(`/resetPassword/${data.token}`, data.values)
     return response.data.message
  } catch (error) {
    console.log((error as Error).message)
  }
})
