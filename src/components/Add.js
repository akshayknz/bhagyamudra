import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { IoIosClose } from "react-icons/io";

const drawerBleeding = 0;
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));
const Badge = styled(Box)`
  background: rgb(112 112 112 / 14%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  width: 87px;
  padding: 8px 9px;
  & .MuiTypography-root {
    font-size:13px;

  }
`;
const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const [datetime, setDatetime] = useState(null);


  const openDrawer = () => () => {
    setOpen(true);
  };
  const closeDrawer = () => () => {
    setOpen(false);
    setTimeout(() => {
      history(-1)
    }, 600);
  };
  useEffect(() => {
    setOpen(true);
  }, [])
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - ${drawerBleeding}px)`,
            width:'100%',
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        disableScrollLock={false} 
        anchor="bottom"
        open={open}
        onClose={closeDrawer()}
        onOpen={openDrawer()}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Container sx={{
            overflow: 'scroll',
            mt:4
          }}>
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Container >
          <Stack direction="row" alignItems="center" sx={{justifyContent:'space-between'}}>
          <Stack sx={{ color: 'grey.500', mt:1.4 }} direction="row" alignItems="center">
            <Typography variant='h5' sx={{ py: 2, px:1, color: 'text.secondary' }}>Add a profile</Typography>
            <Badge>
              <CircularProgress color="inherit" size="20px" />
              <Typography sx={{ p: 0, color: 'text.secondary',display:"flex",alignItems:"center" }}>
                Saving
              </Typography>
            </Badge>
          </Stack>
          <Button onClick={closeDrawer()} sx={{fontSize:30}}><IoIosClose/></Button>
          </Stack>
          </Container>
        </StyledBox>
        <StyledBox
          component="form"
          sx={{
            px: 2,
            pb: 2,
            mt:4,
            height: '200%',
            '& .MuiTextField-root': { mb: 2 },
            '& .MuiButton-root': { mb: 2 },
          }}
        >
          <Typography sx={{mb:3}}>Name</Typography>
          <TextField label="Name" fullWidth variant="outlined" />
          <TextField label="Age" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: "1" }} fullWidth variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker 
              renderInput={(props) => <TextField fullWidth {...props} />}
              label="Date and time of birth"
              value={datetime}
                  onChange={(newValue) => {
                    setDatetime(newValue);
                  }}
            />
          </LocalizationProvider>
          <TextField label="Naal" fullWidth variant="outlined" />
          <Button
            variant="outlined"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden
            />
          </Button>
          <Skeleton variant="rectangular" height="60px" />
          <TextField label="Name" fullWidth variant="outlined" />
          <TextField label="Name" fullWidth variant="outlined" />
          <TextField label="Name" fullWidth variant="outlined" />
          <TextField label="Name" fullWidth variant="outlined" />
          <TextField label="Name" fullWidth variant="outlined" />
          <TextField label="Name" fullWidth variant="outlined" />
          <Button variant='contained'>Add profile</Button>
        </StyledBox>
        </Container>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;