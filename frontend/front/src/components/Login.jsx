import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../store/Store';

const Login = () => {
    const dispatch=useDispatch()
    const history=useNavigate();
    const[inputs,setInputs]= useState({
        
        email:"",
        password:""
    });
    const sendRequest=async()=>{
        const res= await axios.post('http://localhost:3000/login',{
            
            email:inputs.email,
            password:inputs.password
        }).catch(e=>console.log(e));
        
    }
    const handleSubmit = (e) => {
       e.preventDefault();
      // console.log(inputs)
      sendRequest().then(()=>dispatch(authAction.login())).then(()=>history('/home'));

    }
    const handleChange=(e)=>{
       setInputs(prev=>({
        ...prev,
        [e.target.name]:e.target.value
       }))
       //console.log(e.target.name,"value",e.target.value)
    }
    return (
        <div>
           <h2>Login and see task</h2>
            <form onSubmit={handleSubmit}>
                <Box width="300px" justifyContent="center"
                    display="flex"
                    flexDirection={"column"}
                    marginLeft="auto"
                    marginRight="auto">
                    <Typography variant='h3'>
                        Login
                    </Typography>
                    
                    <TextField onChange={handleChange} type='email' value={inputs.email} variant='outlined' placeholder='Email' margin='normal'  name='email'/>
                    <TextField onChange={handleChange} type='password' value={inputs.password} variant='outlined' placeholder='Password' margin='normal'  name='password'/>
                    <Button type='submit' variant='contained'>Login</Button>
                </Box>
            </form>
        </div>
    )
}

export default Login