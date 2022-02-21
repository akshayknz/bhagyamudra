import React, {useEffect} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Logout(){
    const { currentUser, logout } = useAuth()
    const history = useNavigate()
    async function handleLogout() {
        try {
        await logout()
        history("/login")
        } catch {
        }
    }
    useEffect(() => {
        handleLogout()
    }, [])
    
    if(currentUser==null){
        return(<Navigate to={'/login'}></Navigate>)
    }
    else{
        return(<></>)
    }
}