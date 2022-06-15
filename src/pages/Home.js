import { Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled, { css } from "styled-components";
import { FaBeer } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import { useAuth } from "../contexts/AuthContext";
import TextField from "@mui/material/TextField";
import backgroundImg from "../background.webp";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GiDiamondRing } from "react-icons/gi";

const Hero = styled(Paper)({
  paddingInline: "7vw",
  paddingBlock: "10vh",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column",
  boxSizing: "border-box",
})

const IconWrap = styled(Paper)({
  padding: '20px 3vw',
  display: 'flex',
  alignItems: "center",
  flexDirection: "column",
  justifyContent: 'center',
  height: '85%',
  '& svg': {
  padding: '20px 0',
  fontSize: '40px'
  },
  '& .MuiTypography-root': {
    textAlign: 'center'
  }
})
function Home() {
  const { currentUser } = useAuth();

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
          slides: { origin: "center", perView: 2.5, spacing: 35 },
        },
        "(min-width: 1000px)": {
          slides: { origin: "center", perView: 3.5, spacing: 40 },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", nextTimeout);
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  const sliderInfo = [
    {
      name: "Arun Shankar",
      location: "Thrissur",
      description: "This is a short excerpt of the person.",
      image:
        "https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg",
    },
    {
      name: "Arun Shankar",
      location: "Thrissurr",
      description: "This is a short excerpt of the person.",
      image:
        "https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg",
    },
    {
      name: "Arun Shankar",
      location: "Thrissurrr",
      description: "This is a short excerpt of the person.",
      image:
        "https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg",
    },
    {
      name: "Arun Shankar",
      location: "Thrissurrdr",
      description: "This is a short excerpt of the person.",
      image:
        "https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg",
    },
    {
      name: "Arun Shankar",
      location: "Thrissursrr",
      description: "This is a short excerpt of the person.",
      image:
        "https://images.everydayhealth.com/images/resilience/emotional-health/resilience/how-to-overcome-and-avoid-yo-yo-dieting-722x406.jpg",
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{ background: `#000 url("${backgroundImg}") 50%/cover fixed no-repeat`,
      transition:'all .4s' }}>
          <Hero square elevation={0} sx={{ background: "linear-gradient(45deg, #951717, transparent 110%)",height: "92vh" }}>
            <Typography variant="h1" color="common.white" fontWeight={100}>Bhagyamudra</Typography>
            <Typography sx={{ py: 3 }} maxWidth="sm" color="common.white">
              Bhagyamudra Matrimony is a pioneer in matrimonial matchmaking
              services committed to provide 360 degree solutions to all
              prospective Kerala brides and Kerala grooms. We believe in
              providing a secure and convenient matrimonial matchmaking
              experience to our customers.
            </Typography>
            <CallToActionButtons justify={'flex-start'}/>
          </Hero>
        </Grid>
        <Grid item xs={12} sx={{ mt: 14, mb: 10 }}>
          <Typography variant="h2" textAlign={"center"} mb={6}>Find your perfect partner</Typography>
          <Container maxWidth="sm">
            <Stack spacing={2}>
              <TextField label="Name" variant="outlined" />
              <TextField label="Age" variant="outlined" />
              <Box sx={{width:'100%'}}><CallToActionButtons justify={'center'}/></Box>
              
            </Stack>
          </Container>
        </Grid>
        <Grid item xs={12} md={12} ref={sliderRef} sx={{ py: 4, mt: 10, mb: 5 }} className="keen-slider">
          {sliderInfo.map((object, index) => {
            return (
              <Card elevation={3} key={`${object.name}_${object.location}`} className="keen-slider__slide number-slide1">
                <CardMedia component="img" height="140" image={object.image} alt="green iguana"/>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Premium Profile</Typography>
                  <Typography variant="h5" component="div">{object.name}</Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">{object.location}</Typography>
                  <Typography variant="body2">{object.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
        <Container md={6} sx={{ py: 4, mt: 0, mb: 2, ml:2, mr:0 }}>
          <Typography variant="h3" gutterBottom>Bhagyamudra Matrimony</Typography>
          <Grid container spacing={4} sx={{alignItems:'stretch', pt:3, pb: 7}}>
            <Grid item xs={6} md={3}>
              <IconWrap elevation={3}>
                <RiCustomerService2Line />
                <Typography variant="h5">Talk to us</Typography>
                <Typography variant="body2">Make an entry in your dashboard and let us know about you.</Typography>
              </IconWrap>
            </Grid>
            <Grid item xs={6} md={3}>
              <IconWrap elevation={3}>
                <AiOutlineFileSearch />
                <Typography variant="h5">Match profiles</Typography>
                <Typography variant="body2">We'll help you find a match from thousands of profiles in our systems.</Typography>
              </IconWrap>
            </Grid>
            <Grid item xs={6} md={3}>
              <IconWrap elevation={3}>
                <IoChatbubblesOutline />
                <Typography variant="h5">Meet your match</Typography>
                <Typography variant="body2">Contact and discuss with your matches in person.</Typography>
              </IconWrap>
            </Grid>
            <Grid item xs={6} md={3}>
              <IconWrap elevation={3}>
                <GiDiamondRing />
                <Typography variant="h5">Matrimony</Typography>
                <Typography variant="body2">Matched for life.</Typography>
              </IconWrap>
            </Grid>
          </Grid>
          <CallToActionButtons justify={'center'}/>
        </Container>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </>
  );
}
export default Home;

const CallToActionButtons = ({ justify }) => {
  const { currentUser } = useAuth();
  return(
      <Stack spacing={2} direction="row" sx={{width:'100%', justifyContent: justify}}>
      {currentUser ? 
        <Button component={Link} size="large" to={"home/profile/new"} variant="contained">Add profile for free</Button>
      :
        <>
          <Button component={Link} size="large" to={"/login"} variant="contained">Add profile for free</Button>
          <Button component={Link} size="large" to={"/login"} variant="outlined">Login</Button>
        </>
      }
      </Stack>
  )
}