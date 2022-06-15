import React, {useEffect} from 'react';
import '../App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import logo from '../logo.svg'
import logo_short from '../logo_short.svg'
import styled, { css } from 'styled-components'
import { BsArrowUpRight } from "react-icons/bs";

const Logo = styled.img`
    opacity: .37;
    height: 20vh;
    left: -29px;
    display: block;
    z-index: 0;
`;
const Grid1 = styled(Grid)`
    color: white;
    background-color: rgba(0,0,0,0.9);
    color: rgba(255,255,255,0.85);
    height:auto;
`;
const ListItemText1 = styled(ListItemText)`
    text-decoration: underline;
    padding-inline:25px;
    font-weight:100;
    font-weight: 100;
    text-decoration-color: rgba(255,255,255,0.35);
    @media (max-width: 900px) {
        padding-inline:0px;
    }
`;
function Footer() {
  const { settings, pages } = useAuth()
  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
    return (
        <Grid1 container spacing={2} sx={{p:5, pb:2, mt:5}}>
        <Grid item xs={12} sm={6} md={4} sx={{display:'flex', flexDirection:'column', alignItems: 'flex-start', pb:5}}>
            <Logo src={logo_short} />
            <Typography variant='h5' gutterBottom>Bhagyamudra Group</Typography>
            <Typography variant='body2'>
                District: Thrissur District<br></br>
                Telephone code: 0480,
                State: Kerala<br></br>
                Elevation: 20 m (70 ft)
            </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
            <List>
                {pages.map((item,index) => (
                    <ListItem to={item[Object.keys(item)[0]]} key={index+Object.keys(item)[0]+index} disablePadding button component={Link}>
                       <ListItemButton> <ListItemText1>
                            <ListItemText primary={Object.keys(item)[0]}></ListItemText>
                        </ListItemText1></ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Grid>
        <Grid item xs={6} sm={4}>
            <List>
                {settings.map((item,index) => (
                    <ListItem to={item[Object.keys(item)[0]]} key={index+Object.keys(item)[0]+index} disablePadding button component={Link}>
                        <ListItemButton><ListItemText1>
                            <ListItemText primary={Object.keys(item)[0]}></ListItemText>
                        </ListItemText1></ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemText1>
                        <ListItemButton onClick={scrollToTop}>
                            <ListItemText primary="Scroll to top" />
                            <ListItemIcon>
                                <BsArrowUpRight style={{color:"#fff", padding:"0 0 0 10px"}} />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItemText1>
                </ListItem>
            </List>
        </Grid>
        <Divider style={{width:'100%', background:'rgba(255,255,255,.2)'}} />
        <Grid item xs={12}>
            <Typography sx={{textAlign:'center'}}>
                <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} />
                &nbsp;
                Bhagyamudra Group
            </Typography>
        </Grid>
      </Grid1>
    );
  }
export default Footer;