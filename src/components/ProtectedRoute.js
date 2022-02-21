import React, { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {Route, Navigate, Outlet} from 'react-router-dom';

export default function ProtectedRoute(props){
    const { currentUser } = useAuth()
    if (currentUser){
        if(currentUser==null){
            return(<Navigate to={props.redirectTo}></Navigate>)
        }
        else{
            return(<Outlet />)
        }
    }
    else{
        return null
    }
}