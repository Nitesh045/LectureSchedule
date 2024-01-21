import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Update = () => {
    const {id}=useParams();
    const history=useNavigate();
    const[inputs,setInputs]= useState({
        name:"",
        label:"",
        disc:"",
        batchs:"",
        time:"",
    });
    const sendRequest=async()=>{
        const res= await axios.post('http://localhost:3000/taskAdd',{
            name:inputs.name,
            label:inputs.label,
            desc:inputs.disc,
            batchs:inputs.batchs,
            time:inputs.time
        }).catch(e=>console.log(e));
        const data = res.data;
        return data;
    }
    
   
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs)
        sendRequest().then(()=>history('/dash'));
       
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
                        Update
                    </Typography>
                    <TextField onChange={handleChange} type='text' value={inputs.name} variant='outlined' placeholder='Name Of task' margin='normal'  name="name"/>
                    <TextField onChange={handleChange} type='text' value={inputs.label} variant='outlined' placeholder='Name of Label' margin='normal'  name='label'/>
                    <TextField onChange={handleChange} type='text' value={inputs.disc} variant='outlined' placeholder='Discription' margin='normal'  name='disc'/>
                    <TextField onChange={handleChange} type='text' value={inputs.time} variant='outlined' placeholder='date' margin='normal'  name='time'/>
                    <Button type='submit' variant='contained'>Assign</Button>
                </Box>
            </form>
        </div>
    )
}
