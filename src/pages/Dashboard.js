import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../contexts/GlobalContext'
import Typography from '@mui/material/Typography';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { IoIosAddCircleOutline } from "react-icons/io";
import styled, { css } from 'styled-components'
import { db, storage } from '../functions/Firebase';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const CardContent1 = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 78%;
`;
function Dashboard(props) {
  const history = useNavigate()
  const [profiles, setProfiles] = useState([])
  const [card, setCard] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "profiles"), (snapshot) => {
      setProfiles(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
    })
    return unsub
  }, [])
  const getImageForCards = (object) => {
    return object 
      && object.image 
      && Object.keys(object.image)[0] 
      && object.image[Object.keys(object.image)[0]] 
      && object.image[Object.keys(object.image)[0]].url 
      || "https://via.placeholder.com/328x190.png?text=:-)"
  }

    return (<>
      <Grid>
        <Grid item xs={12}>
          <Container sx={{py:3}} style={{paddingTop:"80px"}}>
            <Typography variant='h3' gutterBottom sx={{pt:0}}>Your Profiles</Typography>
            <Typography variant='body2'>Add profiles to Bhagyamudra.</Typography>
            <Grid container spacing={5} sx={{py:6}}>
              <Grid component={Link} style={{textDecoration: 'none'}} to="profile/new" item xs={12} sm={6} md={4}>
                <Card component={Button} sx={{height:'100%', width:'100%'}} elevation={2}>
                  <CardContent1>
                    <IoIosAddCircleOutline style={{fontSize:'100px', color: 'rgba(0,0,0,0.6)'}} />
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                      Add a profile
                    </Typography>
                  </CardContent1>
                </Card>
              </Grid>
              {profiles.length==0? <Grid item xs={12} sm={6} md={4}>
                <Card elevation={2} sx={{height:"100%"}} >
                  <CardMedia component={Skeleton}
                    variant="rectangular" height={140}
                  />
                  <CardContent sx={{pb:0}}>
                    <Typography sx={{ fontSize: 14 }} >
                      <Skeleton width={160}/>
                    </Typography>
                    <Typography variant="h5" component="div">
                      <Skeleton width={260} height={55}/>
                    </Typography>
                    <Typography>
                      <Skeleton variant="rectangular" height={40}/>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={1}>
                      <Skeleton width={80} height={55}/>
                      <Skeleton width={80} height={55}/>
                      <Skeleton width={80} height={55}/>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>:""}
              {profiles.map((object, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={`${object.name}_${index}`}>
                      <Card elevation={2} sx={{height:"100%"}} >
                        <CardMedia
                          component="img"
                          height="140"
                          image={getImageForCards(object)}
                          alt="green iguana"
                        />
                        <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Premium Profile
                        </Typography>
                        <Typography variant="h5" component="div">
                          {object.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {object.zodiac}
                        </Typography>
                        <Typography variant="body2">
                          {JSON.stringify(object.datetime)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button to={`profile/view/${object.id}`} variant='contained' component={Link} >View</Button>
                        <Button to={`profile/edit/${object.id}`} component={Link} >Edit</Button>
                        <Button to={`profile/delete/${object.id}`} component={Link} >Delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  )
                })}
              </Grid>
          </Container>
        </Grid>

      </Grid>
      <Outlet />
      </>
    );
  }
export default Dashboard;