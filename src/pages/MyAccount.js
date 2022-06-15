import React, { useContext, useRef, useState, useEffect } from 'react';
import { Context } from '../contexts/GlobalContext';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styled, { css } from 'styled-components';
import { db, storage } from '../functions/Firebase';
import {
	getFirestore,
	collection,
	query,
	where,
	updateDoc,
	getDoc,
	doc,
	setDoc,
	addDoc,
	serverTimestamp,
	deleteDoc
} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, sendEmailVerification, updatePassword } from "firebase/auth";

function MyAccount() {
  const [state, dispatch] = useContext(Context);
	const [ contact, setContact ] = useState();
	const formRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const { currentUser, reauthWithGoogle } = useAuth();
	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ phoneNumber, setPhoneNumber ] = useState("");
	const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pin, setPin] = useState("")
  const [address, setAddress] = useState("")
	useEffect(() => {
    const docRef = doc(db, "users", currentUser.uid);
    
    const getUser = async() => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let data = docSnap.data()
        setPhoneNumber(currentUser.phoneNumber || data.phoneNumber)
        setAddress(data.address)
        setPin(data.pin)
      }
    }
    getUser()
    setName(currentUser.displayName)
    setEmail(currentUser.email)
    
		return;
	}, []);

	function handleSubmit() {
    if(formRef.current.reportValidity()){
      console.log('im in');
      updateProfile(currentUser,{displayName: name})
      const userEntry = async() => {
        await setDoc(doc(db, "users", currentUser.uid), {
          phoneNumber: phoneNumber,
          pin: pin,
          address: address
        });
        dispatch({type:"show", payload:"Account info saved."})
      }
      userEntry()
    }
	}

  function verifyEmail() {
    sendEmailVerification(currentUser)
    .then(() => dispatch({type:"show", payload:"Verification email sent."}))
  }

  function updatePasswordFun() {
    passwordRef.current.reportValidity()
    if(passwordRef.current.value != confirmPasswordRef.current.value){
      confirmPasswordRef.current.setCustomValidity('The password dont match.')
      confirmPasswordRef.current.reportValidity()
    }else if(passwordRef.current.value==""){
		passwordRef.current.setCustomValidity('This field is required.')
		passwordRef.current.reportValidity()
	}
    updatePassword(currentUser, passwordRef.current.value)
    .then(() => {
      dispatch({type:"show", payload:"New password set."})
      setPassword("")
      setConfirmPassword("")
    })
    .catch(e => reauthWithGoogle())
  }

	return (
		<Container sx={{ py: 5 }}>
			<Grid container columnSpacing={4}>
				<Grid item xs={12} md={6}>
					<Typography variant="h3" gutterBottom>
						My Account
					</Typography>
					<Typography gutterBottom>
						Add relavent account information. Make sure all the fields are filled and correct.
					</Typography>
				</Grid>
				<Grid item xs={12} mt={2}>
					<Grid container component='form' ref={formRef} spacing={3}>
						<Grid item xs={12}>
							<TextField label="Name" required value={name} onChange={e => setName(e.target.value)} fullWidth variant="outlined" />
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ border: '1px solid rgba(0,0,0,0.2)', p: 2, borderRadius: 2 }} component='fieldset'>
                <legend><Typography variant='body2'>Email</Typography></legend>
								<Grid container spacing={3}>
                  <Grid item xs={12}><Typography variant='body2'>
                    {currentUser.emailVerified? `Your email is verified.`:`Your email is not yet verified. 
                    Click on verify email to recieve the verification email in your inbox.`}
                  </Typography></Grid>
									<Grid item xs={12} sm={10}>
										<TextField label="Email" required value={email} onChange={e => setEmail(e.target.value)} fullWidth variant="outlined" />
									</Grid>
									<Grid item xs={12} sm={2} sx={{ display: 'flex' }}>
                    {currentUser.emailVerified? 
                      <Button variant="outlined" size='small' sx={{color:'green',borderColor:'green'}} fullWidth>Email verified</Button>
                      :<Button onClick={verifyEmail} variant="outlined" size='small' fullWidth>Verify email</Button>
                    }
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ border: '1px solid rgba(0,0,0,0.2)', p: 2, borderRadius: 2 }} component='fieldset'>
                <legend><Typography variant='body2'>Password</Typography></legend>
								<Grid container spacing={3}>
                <Grid item xs={12}><Typography variant='body2'>Leave the fields empty to keep your old password.</Typography></Grid>
									<Grid item xs={12} sm={5}>
										<TextField label="Password"  inputProps={{minLength:8, maxLength:15}} value={password} inputRef={passwordRef} onChange={e => setPassword(e.target.value)} type="password" fullWidth variant="outlined" />
									</Grid>
									<Grid item xs={12} sm={5}>
										<TextField label="Confirm Password" value={confirmPassword} inputRef={confirmPasswordRef} onChange={e => setConfirmPassword(e.target.value)} type="password" fullWidth variant="outlined"/>
									</Grid>
									<Grid item xs={12} sm={2} sx={{ display: 'flex' }}>
										<Button onClick={updatePasswordFun} variant="outlined" size='small' fullWidth>Update password</Button>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<TextField label="Address" value={address} onChange={e => setAddress(e.target.value)} fullWidth variant="outlined" />
						</Grid>
						<Grid item xs={6}>
							<TextField label="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} fullWidth variant="outlined" />
						</Grid>
						<Grid item xs={6}>
							<TextField label="PIN Code" value={pin} onChange={e => setPin(e.target.value)} fullWidth variant="outlined" />
						</Grid>
						<Grid item xs={12}>
							<Stack spacing={3} direction="row">
                <Button variant='contained' size='large' onClick={handleSubmit}>Save</Button>
                <Button variant='outlined' size='large'>Cancel</Button>
              </Stack>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h3" gutterBottom>
								Account Management
							</Typography>
							<Typography variant="h5" gutterBottom>
								Linked accounts
							</Typography>
							{currentUser.providerData.map((object, index) => {
								return (
									<Box key={object.providerId} my={1}>
										{object.providerId}
									</Box>
								);
							})}
							<Typography variant="h5">Account Information</Typography>
							<Typography>Account creation: {currentUser.metadata.creationTime}</Typography>
							<Typography gutterBottom>Last login: {currentUser.metadata.lastSignInTime}</Typography>
							<Typography variant="h5">Account Deactivation</Typography>
							<Typography>
								Delete your account form Bhagyamudra. This action is irriversable. Proceed with caution.
							</Typography>
							<Stack spacing={3} direction="row" mt={2}>
								<Button variant="contained">Delete your account</Button>
								<Button variant="outlined">Contact us</Button>
							</Stack>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
export default MyAccount;
