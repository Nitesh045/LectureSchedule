import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
axios.defaults.withCredentials=true;

export const Dash = () => {
    const [details,setDetails]=useState([]);
    const sendRequest= async()=>{
      const res=  await axios.get('http://localhost:3000/dash',{
            withCredentials:true,
        }).catch(e=>console.log(e));
        const data= await res.data;
       {console.log(data)}
        return data;
        
    }
    useEffect(()=>{
        sendRequest().then((data)=>setDetails(data))
    },[])
  return (
    <div>
      {console.log(details)}
       <h3 style={{textAlign:"center"}}>Welcome On Admin Page</h3>
        {details.map((iteams)=>{
            return(
           <div className="list" style={{color:"white",width:"300px",marginLeft:"auto",marginRight:"auto",paddingTop:"20px"}}>
             <ul key={iteams._id} style={{listStyle:"none"}} >
                <li style={{marginTop:"20px",marginBottom:"30px",background:"black",width:"400px",height:"100px",paddingLeft:"100px",paddingRight:"auto",paddingTop:"70px",paddingBottom:"auto"}}>{iteams.name}
                <br>
                </br>
                {iteams.email}
                 <Button href={`/update/${iteams._id}`} variant='contained' marginLeft="auto">AssignTask</Button>
                </li>
            </ul>
           </div>
            )
        })}
        
    </div>
  )
}
