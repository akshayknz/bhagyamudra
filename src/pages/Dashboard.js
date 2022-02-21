import React, {Component} from 'react';
import Typography from '@mui/material/Typography';
import { Link, useParams, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { IoIosAddCircleOutline } from "react-icons/io";
import styled, { css } from 'styled-components'

const CardContent1 = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 78%;
`;
function Dashboard(props) {
  const sliderInfo = [
    {
      name: 'Arun Shankar',
      location: 'Thrissur',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankardsfg',
      location: 'Thrissurr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankardsfg',
      location: 'Thrissurr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankardsfg',
      location: 'Thrissurr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankardsfg',
      location: 'Thrissurr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankardsfg',
      location: 'Thrissurr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    }
  ];
    return (<>
      <Grid>
        <Grid item xs={12}>
          <Container sx={{py:3}} style={{paddingTop:"100px"}}>
            <Typography variant='h3' gutterBottom sx={{pt:0}}>Your Profiles</Typography>
            <Typography variant='body2'>Add profiles to Bhagyamudra.</Typography>
            <Typography variant='body2'>Add profiles to Bhagyamudra.</Typography>
            <Grid container spacing={5} sx={{py:6}}>
              <Grid component={Link} style={{textDecoration: 'none'}} to="add" item xs={3} sm={6} md={4}>
                <Card component={Button} sx={{height:'100%', width:'100%'}} elevation={2}>
                  <CardContent1>
                    <IoIosAddCircleOutline style={{fontSize:'100px', color: 'rgba(0,0,0,0.6)'}} />
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                      Add a profile
                    </Typography>
                  </CardContent1>
                </Card>
              </Grid>
              {sliderInfo.map((object, index) => {
                  return (
                    <Grid item xs={3} sm={6} md={4} key={`${object.name}_${index}`}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={object.image}
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
                          {object.location}
                        </Typography>
                        <Typography variant="body2">
                          {object.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
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