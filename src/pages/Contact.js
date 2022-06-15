import React, { Component, useRef, useState, useContext } from 'react';
import { Context } from '../contexts/GlobalContext'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styled, { css } from 'styled-components'
import { db, storage } from '../functions/Firebase';
import { getFirestore, collection, query, where, updateDoc, getDoc, doc, setDoc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

function Contact() {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [content, setContent] = useState("")
  const formRef = useRef()
  const [state, dispatch] = useContext(Context);

  function handleSubmit(){
    formRef.current.reportValidity()
    const upload = async() => {
      await addDoc(collection(db, 'enquiry'), {
        name: name,
        contact: contact,
        content: content
      })
      dispatch({type:"show", payload:"Thank you. We'll get back to you soon."})
      setName("")
      setContact("")
      setContent("")
    }
    if(name != "" && contact != "" && content != "" ) upload()
  }
    return (
      <Container sx={{py:5}}>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant='h3' gutterBottom>
              Contact us
            </Typography>
            <Typography gutterBottom>
              You can contact us on our hotline or you can fill the following form,
              which we usually reply in around 3 bussiness days. Thank you.
            </Typography>
            <Box component="form" ref={formRef}
              sx={{ px: 0, pb: 0, mt:4, height: '200%',
                '& .MuiTextField-root': { mb: 2 }, '& .MuiButton-root': { mb: 2 },
              }}
            >
              <TextField required value={name} onChange={e => setName(e.target.value)} label="Name" fullWidth variant="outlined" />
              <TextField required value={contact} onChange={e => setContact(e.target.value)} label="Phone number / Email" fullWidth variant="outlined" />
              <TextField 
                label="Optional" multiline
                required value={content} onChange={e => setContent(e.target.value)}
                minRows={4} maxRows={10} 
                fullWidth variant="outlined" />
              <Button variant="contained" sx={{px:3}}
                size="medium" onClick={handleSubmit}
              >Submit</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15696.15390178435!2d76.26487252038864!3d10.418518956942208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7f0af8ca96b45%3A0x145bf6795f57ca6e!2sPudukad!5e0!3m2!1sen!2sin!4v1645984125690!5m2!1sen!2sin" 
              allowFullScreen="" 
              loading="lazy"
              style={{width:'100%', height:"70%", border:"none", borderRadius:"15px", border:'2px solid #00000057'}}
            ></iframe>
            <Typography variant='h4' gutterBottom sx={{pt:3}}>
              Bhagyamudra Group
            </Typography>
            <Typography variant="body1">
              District: Thrissur District<br></br>
              Telephone code: 0480, State: Kerala<br></br>
              Elevation: 20 m (70 ft)
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
export default Contact;