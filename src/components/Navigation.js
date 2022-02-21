import React, {useEffect} from 'react';
import '../App.css';
import styled, { css } from 'styled-components'
import logo from '../logo.svg'
import logo_short from '../logo_short.svg'
import AppBar from '@mui/material/AppBar';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';  
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Footer from './Footer';

const Buttonss = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition:all .3s;
  font-size:40px;
  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
  &:hover{
    background:red;
  }
`
const BottomNavigationStyled = styled(BottomNavigation)`
  width:100%;
  position: fixed;
  bottom:0;
`;
const theme = createTheme({
  palette: {
     primary: {
        main: '#ff0000',
     },
  },
  typography: { 
    useNextVariants: true,
    fontFamily: `"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    h3: {
      fontWeight: 100,
    },
    h1: {
      fontWeight: 100,
    },
  }
});
function Navigation(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [photoURL, setPhotoURL] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const { currentUser, settings, pages } = useAuth()
  useEffect(() => {
    if(currentUser?.photoURL){
      setPhotoURL(currentUser.photoURL)
    }else{
      setPhotoURL(null)
    }
  }, [currentUser])
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <ThemeProvider theme = { theme }>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop [start] */}
            <Typography
              variant="h6"
              noWrap
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              component={Link} 
              to={'/'}
            >
              <img style={{height: "60px"}} src={logo} />
            </Typography>
            <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent:'flex-end' }}>
              {pages.map((page, link) => (
                <Button
                  key={link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link} 
                  to={page[Object.keys(page)[0]]}
                >
                  {Object.keys(page)[0]}
                </Button>
              ))}
              {settings.map((page, link) => (
                <Button
                  key={link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link} 
                  to={page[Object.keys(page)[0]]}
                >
                  {Object.keys(page)[0]}
                </Button>
              ))}
            </Box>
            {/* Desktop [end] */}
            {/* Mobile [start] */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page[Object.keys(page)[0]]} onClick={handleCloseNavMenu} component={Link} to={page[Object.keys(page)[0]]}>
                    <Typography textAlign="center">{Object.keys(page)[0]}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <img style={{height: "60px"}} src={logo_short} />
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open user menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={photoURL} />
                </IconButton>
              </Tooltip>
              <Popover
                id={"menu-appbar"}
                open={Boolean(anchorElUser)}
                anchorEl={anchorElUser}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                
              >
                {currentUser? 
                  <Box sx={{pt:3, ['@media (min-width:900px)']: { 
                    pb:5
                  }}}>
                  <Box sx={{textAlign: 'center', px:3}}>
                    <IconButton sx={{ mb:1 }}>
                      <Avatar  sx={{ width: 86, height: 86 }} alt={currentUser.displayName} src={photoURL} />
                    </IconButton>
                    <Typography gutterBottom sx={{fontWeight:400}} variant='h6'>{currentUser.displayName}</Typography>
                    <Box sx={{display:'flex', alignItems: 'center'}}>
                        <Avatar sx={{ width: 24, height: 24, mr:1, p:.5, border:'1px solid rgba(0,0,0,.2)' }} src={'https://'+currentUser.providerData[0].providerId+'/favicon.ico'} />
                      <Typography>{currentUser.email}</Typography>
                    </Box>
                  </Box>
                    <List sx={{display: { xs: 'block', md: 'none' }}}>
                    <Divider style={{width:'100%'}} />
                      <ListItem disablePadding sx={{flexDirection:'column'}}>
                        {settings.map((page, link) => (
                          <ListItemButton sx={{width:'100%'}} key={link} onClick={handleCloseUserMenu} component={Link} to={page[Object.keys(page)[0]]}>
                              <ListItemText  primary={<Typography textAlign="center">{Object.keys(page)[0]}</Typography>}  />
                          </ListItemButton>
                        ))}
                      </ListItem>
                    </List>
                  </Box>
                :
                  <>
                    <Typography sx={{ p: 2, px:3 }}>Login to your account.</Typography>
                    <Divider style={{width:'100%'}} />
                    <List>
                      <ListItem disablePadding sx={{flexDirection:'column'}}>
                        <ListItemButton sx={{width:'100%'}} onClick={handleCloseUserMenu} component={Link} to={'/login'}>
                            <ListItemText  primary={<Typography textAlign="center">Login</Typography>}  />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </>
                }                
              </Popover>
              
            </Box>
            {/* Mobile [end] */}
          </Toolbar>
        </Container>
        </AppBar>
        {/* {<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Paper>} */}
      
        {props.children}
        <Footer />
    </ThemeProvider>
  );
}

export default Navigation;
