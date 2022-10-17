import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EmailVerify() {
    const [validUrl,setValidUrl]=useState(false);
    const params=useParams();
    const navigate =useNavigate();
    useEffect(()=>{
       const verifyEmailUrl = async()=>{
        try{
            const url=`http://localhost:3000/userController/${params.id}/verify/${params.token}`;
            const {data} = await axios.get(url);
            console.log(data);
            setValidUrl(true);
        }
        catch(error){
            console.log(error);
            setValidUrl(false)
        }
       };
       verifyEmailUrl()
    },[params]);
  return (
    <div>
      
       { validUrl ? <h1>Email Verified</h1> : <h1>404 Not Found</h1>}
        <Button onClick={navigate("/login")}>Login</Button>
    </div>
  )
}

export default EmailVerify
