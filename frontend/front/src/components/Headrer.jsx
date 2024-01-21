import React, { useState } from 'react'
import { AppBar, Typography,Tabs,Tab,Box,Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authAction } from '../store/Store'
axios.defaults.withCredentials=true;

export const Headrer = () => {
    const dispatch=useDispatch()
    const isLoggedIn=useSelector(state=>state.isLoggedIn)
    const [value,setValue]=useState()
    const sendRequestlogOut=async ()=>{
        const res=await axios.post('http://localhost:3000/logout',null,{
         withCredentials:true
        });
        if(res.status==200){
            return res
        }
        return new Error("unable to log out")
    }
    const logoutHandle=()=>{
     sendRequestlogOut().then(()=>{
        dispatch(authAction.logout())
     })
    }
    return (
        <div>

            <AppBar position='sticky'>
                <Toolbar>
                <Typography variant='h3'>Lecture</Typography>
                <Box sx={{marginLeft:"auto"}}>
                    <Tabs textColor='inhirit' value={value} onChange={(e,val)=>setValue(val)} indicatorColor='secondary'>
                       {!isLoggedIn && <><Tab  href='/login' label="Login"/>
                        <Tab  href='/register' label="SignUp"/>
                        <Tab href='/adminLogin' label="Admin"/>
                        </>
                        }
                       {isLoggedIn && ( <Tab  href='/' label="Loguot" onClick={logoutHandle}/>)}
                    </Tabs>
                </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
