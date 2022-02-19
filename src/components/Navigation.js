import React from 'react';
import '../App.css';
import styled, { css } from 'styled-components'
import logo from '../logo.svg'
import logo_short from '../logo_short.svg'
import AppBar from '@mui/material/AppBar';
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

const pages = [{"Home":"/"}, {"Contact us":"/contact"}, {"Login":"/login"}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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
function App(props) {
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [value, setValue] = React.useState(0);

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
              component="div"
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
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <img style={{height: "60px"}} src={logo_short} />
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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
    </ThemeProvider>
  );
}

export default App;
