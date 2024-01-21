import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'

const Singup = () => {
    const history=useNavigate();
    const[inputs,setInputs]= useState({
        name:"",
        email:"",
        password:""
    });
    const sendRequest=async()=>{
        const res= await Axios.post('http://localhost:3000/register',{
            name:inputs.name,
            email:inputs.email,
            password:inputs.password
        }).catch(e=>console.log(e));
        const data = res.data;
        return data;
    }
    const handleSubmit = (e) => {
       e.preventDefault();
      // console.log(inputs)
      sendRequest().then(()=>history('/login'));

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
           
            <form onSubmit={handleSubmit}>
                <Box width="300px" justifyContent="center"
                    display="flex"
                    flexDirection={"column"}
                    marginLeft="auto"
                    marginRight="auto">
                    <Typography variant='h3'>
                        Register
                    </Typography>
                    <TextField onChange={handleChange} type='text' value={inputs.name} variant='outlined' placeholder='Name' margin='normal'  name="name"/>
                    <TextField onChange={handleChange} type='email' value={inputs.email} variant='outlined' placeholder='Email' margin='normal'  name='email'/>
                    <TextField onChange={handleChange} type='password' value={inputs.password} variant='outlined' placeholder='Password' margin='normal'  name='password'/>
                    <Button type='submit' variant='contained'>SingUp</Button>
                </Box>
            </form>
        </div>
    )
}

export default Singup