import React, { Component, useEffect, useState, useContext } from 'react';
import { Context } from '../contexts/GlobalContext'
import Typography from '@mui/material/Typography';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styled, { css } from 'styled-components'
import { db, storage } from '../functions/Firebase';
import { doc, deleteDoc } from "firebase/firestore";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Delete() {
  const [state, dispatch] = useContext(Context);
  const history = useNavigate()
  let { id } = useParams()
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false);
    history(-1)
  }

  const deleteItem = async () => {
    const unsub = await deleteDoc(doc(db, "profiles", id));
    dispatch({type:"show", payload:"Profile deleted."})
    handleClose()
    return unsub
  }

  return (
    <Dialog
        open={open} onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Delete this profile?
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Deleting this entry will remove all the data from our end including
            the images, files, the records of payments associated with this profile 
            and other resources present in our system.
        </DialogContentText>
        </DialogContent>
        <DialogActions sx={{pb:2, pr:2}}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteItem} autoFocus variant='contained'>Delete</Button>
        </DialogActions>
    </Dialog>
    )
  }

export default Delete