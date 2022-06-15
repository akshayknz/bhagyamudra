import React, { Component, useEffect, useState, useContext } from 'react';
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
import { getFunctions, httpsCallable } from "firebase/functions";
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext';
import logo from '../logo.svg'
import { RiSecurePaymentLine } from "react-icons/ri";

function Pay({ text, price, documentId, disabled }) {
    const functions = getFunctions()
    const { currentUser } = useAuth()

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        });
    }

    async function displayRazorpay(event) {
        event.preventDefault()

        const sdkLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!sdkLoaded) throw new Error('Razorpay SDK failed to load')
        
        const getNewOrderId = httpsCallable(functions, 'getNewOrderId')
        const savePaymentResult = httpsCallable(functions, 'savePaymentResult')

        const order = await getNewOrderId({ price: price })
        if (!order) throw new Error('Server error')
        const { amount, id: order_id, currency, name, description } = order.data

        const options = {
            key: "rzp_test_iuhRpHle3JP7mz", 
            amount: amount.toString(),
            currency: currency,
            name: name,
            description: description,
            image: "https://www.gstatic.com/mobilesdk/171005_mobilesdk/discovery-cards-crashlytics.png",
            prefill: {
                name: currentUser.displayName,
                email: currentUser.email,
                contact: currentUser.phoneNumber,
            },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    documentId: documentId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                const result = await savePaymentResult({ data })
                console.log(result)
            },
            theme: { color: "red" },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    return (
      <>
        <Button variant='contained' startIcon={<RiSecurePaymentLine />} disabled={disabled} size='large' onClick={displayRazorpay}>{text}</Button>
      </>
    );
  }
export default Pay;