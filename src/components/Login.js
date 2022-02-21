import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FaFacebook,FaGoogle } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom"
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineLogin } from "react-icons/md";
import styled, { css } from 'styled-components'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            {children}
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Login = () => {
    const [value, setValue] = React.useState(0);
    const [opacitylvl, setOpacitylvl] = React.useState(0);
    const {currentUser} = useAuth()
    const history = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        if(currentUser != null){
            history('/home')
        }
    }, [currentUser])
    
    return (
        <Grid sx={{ flexGrow: 1, height: "55vh", alignItems: "center", mb:50, mt:1 }} container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    <Box sx={{ '& .MuiTextField-root': { m: 1 },
                textAlign: 'center', }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab icon={<MdOutlineLogin />} sx={{minHeight: "50px"}} iconPosition="start" label="Login" {...a11yProps(0)} />
                            <Tab icon={<HiOutlineUserAdd />} sx={{minHeight: "50px"}} iconPosition="start" label="Register" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <LoginComponent />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <RegisterComponent />
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Login;

const LoginComponent = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser, loginWithGoogle, loginWithFacebook } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [opacitylvl, setOpacitylvl] = useState(0)
    const history = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
          setError("")
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          history("/home")
        } catch {
          setError("Failed to create an account")
        }
        // setLoading(false)
    }
    async function handleGoogleSubmit(e) {
        e.preventDefault()
        try {
          setError("")
          setLoading(true)
          await loginWithGoogle()
          history("/home")
        } catch {
          setError("Failed to create an account")
        }
        // setLoading(false)
    }
    async function handleFacebookSubmit(e) {
        e.preventDefault()
        try {
          setError("")
          setLoading(true)
          await loginWithFacebook()
          history("/home")
        } catch(e) {
            console.log(e);
          setError("Failed to create an account")
        }
        // setLoading(false)
    }
    useEffect(() => {
      setOpacitylvl(1-opacitylvl)
    }, [])
    const opacityStyle = {
        opacity: opacitylvl,
        transform: `translateX(-${(1-opacitylvl)*50}px)`,
        transition: "all 0.2s"
      };
    return (
        <Box
            style={opacityStyle}
            component="form"
            onSubmit={handleSubmit} 
            sx={{
                '& .MuiTextField-root': { m: 1 },
                textAlign: 'center',
                width: 300,
                ['@media (max-width:400px)']: {
                    width: '100%'
                }
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h3" sx={{textAlign: "left", px:1, pb:2}}>Login</Typography>
            <TextField inputRef={emailRef} fullWidth label="Email" variant="outlined" />
            <TextField inputRef={passwordRef} fullWidth label="Password" type="password" variant="outlined" />
            <Button type="submit" variant="contained">Login</Button>
            <Stack spacing={1} sx={{
                my:3, mx:5,
                ['@media (max-width:400px)']: {
                    my:3, mx:0
                }
                }}>
            <Button onClick={handleGoogleSubmit} variant="outlined" sx={{textTransform:"none"}} startIcon={<FaGoogle />}>Login with Google</Button>
            <Button onClick={handleFacebookSubmit} variant="outlined" sx={{textTransform:"none"}} startIcon={<FaFacebook />}>Login with Facebook</Button>
            </Stack>
        </Box>
    );
}

const RegisterComponent = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser, loginWithGoogle, loginWithFacebook } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [opacitylvl, setOpacitylvl] = useState(0)
    const history = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        passwordConfirmRef.current.setCustomValidity('')
        if (!e.currentTarget.checkValidity() || passwordRef.current.value !== passwordConfirmRef.current.value) {
            if(!e.currentTarget.checkValidity()){
                e.currentTarget.reportValidity()
                return;
            }
            passwordConfirmRef.current.setCustomValidity( 'Passwords do not match' );
            passwordConfirmRef.current.reportValidity();
            return;
        }
        try {
          setError("")
          setLoading(true)
          await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
          history.push("/")
        } catch(e) {
            console.log(e);
            switch (e.code) {
                case 'auth/weak-password':
                    passwordRef.current.setCustomValidity( e.message.replace('Firebase: ', '').replace(` (${e.code}).`, '') );
                    passwordRef.current.reportValidity();
                    break;
                case 'auth/email-already-in-use':
                    emailRef.current.setCustomValidity( e.message.replace('Firebase: ', '').replace(` (${e.code}).`, '') );
                    emailRef.current.reportValidity();
                    break;
                default:
                    break;
            }
        //   setError()
        }
        // setLoading(false)
    }
    async function handleGoogleSubmit(e) {
        e.preventDefault()
        try {
          setError("")
          setLoading(true)
          await loginWithGoogle()
          history("/home")
        } catch {
          setError("Failed to create an account")
        }
        // setLoading(false)
    }
    async function handleFacebookSubmit(e) {
        e.preventDefault()
        try {
          setError("")
          setLoading(true)
          await loginWithFacebook()
          history("/home")
        } catch(e) {
            console.log(e);
          setError("Failed to create an account")
        }
        // setLoading(false)
    }
    useEffect(() => {
        setOpacitylvl(1-opacitylvl)
    }, [])
    
    const opacityStyle = {
        opacity: opacitylvl,
        transform: `translateX(${(1-opacitylvl)*50}px)`,
        transition: "all 0.2s"
    };

    return (
        <Box
            style={opacityStyle}
            component="form"
            onSubmit={handleSubmit} 
            sx={{
                '& .MuiTextField-root': { m: 1 },
                textAlign: 'center',
                width: 300,
                ['@media (max-width:400px)']: {
                    width: '100%'
                }
            }}
            noValidate
            autoComplete="off"
        >
            {error}
            <Typography variant="h3" sx={{textAlign: "left", px:1, pb:2}}>Register</Typography>
            <TextField inputRef={nameRef} required fullWidth label="Name" variant="outlined" />
            <TextField inputRef={emailRef} required fullWidth label="Email" type="email" variant="outlined" />
            <TextField inputRef={passwordRef} onKeyPress={(e)=>{e.target.setCustomValidity('');e.target.reportValidity('')}} required fullWidth label="Password" type="password" variant="outlined" />
            <TextField inputRef={passwordConfirmRef} onKeyPress={(e)=>{e.target.setCustomValidity('');e.target.reportValidity('')}} required fullWidth label="Confirm Password" type="password" variant="outlined" />
            <Button type="submit" variant="contained">Login</Button>
            <Stack spacing={1} sx={{
                my:3, mx:5,
                ['@media (max-width:400px)']: {
                    my:3, mx:0
                }
                }}>
            <Button onClick={handleGoogleSubmit} variant="outlined" sx={{textTransform:"none"}} startIcon={<FaGoogle />}>Register with Google</Button>
            <Button onClick={handleFacebookSubmit} variant="outlined" sx={{textTransform:"none"}} startIcon={<FaFacebook />}>Register with Facebook</Button>
            </Stack>
        </Box>
    );
}