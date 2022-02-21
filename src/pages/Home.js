import { Routes, Route, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled, { css } from 'styled-components'
import { FaBeer } from 'react-icons/fa';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useAuth } from '../contexts/AuthContext';

const Hero = styled(Paper)(() => ({
    padding:'50px',
    height:'50vh'
  }));
function Home() {
  const { currentUser } = useAuth()

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slides: {
        origin: "center",
        perView: 1.5,
        spacing: 25,
      },
      breakpoints: {
        "(min-width: 500px)": {
          slides: { origin: "center",perView: 2.5, spacing: 35 },
        },
        "(min-width: 1000px)": {
          slides: { origin: "center",perView: 3.5, spacing: 40 },
        },
      },
    },
    [
      (slider) => {
        let timeout
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", nextTimeout)
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      }
    ]
  )
  const sliderInfo = [
    {
      name: 'Arun Shankar',
      location: 'Thrissur',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankar',
      location: 'Thrissurr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankar',
      location: 'Thrissurrr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankar',
      location: 'Thrissurrdr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    },
    {
      name: 'Arun Shankar',
      location: 'Thrissursrr',
      description: 'This is a short excerpt of the person.',
      image: 'https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg'
    }
  ];
    return (
      <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Hero square elevation={0}>
                    <Typography variant="h3">Bhagyamudra</Typography>
                    <Typography sx={{py:3}}>LOrem Ipsum test is foinf to be the rgraredst and te most reaialvl and of.</Typography>
                    <Stack spacing={2} direction="row">
                        {currentUser? 
                          <>
                            <Button component={Link} size="large" to={'home/add'} variant="contained">Add your profile</Button>
                          </>
                          :<>
                            <Button component={Link} size="large" to={'/login'} variant="contained">Add your profile</Button>
                            <Button component={Link} size="large" to={'/login'} variant="outlined">Login</Button>
                          </>
                        }
                        </Stack>
                </Hero>
            </Grid>
            <Grid item xs={12} md={12} ref={sliderRef} sx={{py:4}} className="keen-slider">
              {sliderInfo.map((object, index) => {
                return (
                  <Card elevation={10} key={`${object.name}_${object.location}`} className="keen-slider__slide number-slide1">
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
                )
              })}
              
            </Grid>
            <Grid item xs={12} md={6}>
            </Grid>
            <Grid item xs={12} md={6}>
            </Grid>
        </Grid>
      </>
    );
  }
export default Home;