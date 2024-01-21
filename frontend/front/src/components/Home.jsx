import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
axios.defaults.withCredentials=true;


const Home = () => {
    const [teacher,setTeacher]=useState()
    const sendRequest= async()=>{
        const res= await axios.get('http://localhost:3000/lecture',{
            withCredentials:true

        }).catch(err=>console.log(err));
        const data =  await res.data;
        return data;
    }
    useEffect(()=>{
        sendRequest().then((data)=>setTeacher(data.user))
    })
  return (
    <div>
        <h3>{teacher && <p>{teacher.name}</p>}</h3>
    </div>
  )
}

export default Home