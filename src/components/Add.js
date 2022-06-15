import {useEffect, useState, useRef} from 'react';
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
import Grid from '@mui/material/Grid';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { db, storage } from '../functions/Firebase';
import { getFirestore, collection, onSnapshot, where, updateDoc, getDoc, doc, setDoc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { IoIosClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiShieldCheckFill } from "react-icons/ri";
import { useAuth } from '../contexts/AuthContext';
import Image from './Image'
import Pay from "./Pay";

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
const ButtonNoGutter = styled(Button)`
  margin-bottom:9px !important;
  width:100%;
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
  let { action, id } = useParams();
  const { window } = props
  const [open, setOpen] = useState(false)
  const history = useNavigate()
  const [documentId, setDocumentId] = useState(null)
  const [image, setImage] = useState({})
  const [autoSave, setAutoSave] = useState(false)
  const {currentUser} = useAuth()
  // const nameRef = useRef("")
  // const datetimeRef = useRef("")
  // const heightRef = useRef("")
  // const weightRef = useRef("")
  // const ageRef = useRef("")
  // const zodiacRef = useRef("")
  const [datetime, setDatetime] = useState(null)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [zodiac, setZodiac] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [payment, setPayment] = useState("")
  const nameRef = useRef()

  const getProfile = async (id) => {
    onSnapshot(doc(db, "profiles",id), (doc) => {
      console.log("Current data: ", doc.data());
      let data = doc.data()
      setName(data.name || "")
      setAge(data.age || "")
      setZodiac(data.zodiac || "")
      setHeight(data.height || "")
      setWeight(data.weight || "")
      setDatetime((data.datetime)? data.datetime.toDate(): null)
      setImage((data.image)? data.image:{})
      setPayment(data.payment || "")
    });
  }

  useEffect(() => {
    /**
     * This block only run once and is used to initialize this
     * component. This is the useEffect that initialize this 
     * drawer by;
     * - setting the `open` state to true
     * - if the action is `add`:
     * -- create a blank document to `profiles` collection
     * -- save the created document's id to a state for later updates 
     * - if the action is `edit`:
     * -- set the `documentId` state from url param
     */
    setOpen(true);
    if(!documentId && !id){
      const createProfile = async () => {
        const docRef = await addDoc(collection(db, "profiles"), {
          timestamp: serverTimestamp()
        });
        return docRef
      }
      return createProfile().then(docRef => {
        setDocumentId(docRef.id)
        getProfile(docRef.id)
      })
    }else if(!documentId && id){
      setDocumentId(id)
      return getProfile(id)
    }
  }, [])



  const openDrawer = () => () => {
    setOpen(true);
  }

  const closeDrawer = () => () => {
    /**
     * This function handles the drawer closing events, them being;
     * - updating everything entered to the database
     * - removing the document from database if the fields are all blank
     * - closes the drawer by setting the `open` state to false
     * - pushing history back to /home
     */
    if(
        (
          (datetime != "" && datetime!=null)
          || height != ""
          || weight != ""
          || age != ""
          || zodiac != ""
          || Object.keys(image).length > 0
          || payment != ""
        )
        && name==""){
      console.log(nameRef.current);
      nameRef.current.checkValidity()
      nameRef.current.reportValidity()
      return
    }
    setOpen(false); //close the drawer
    setTimeout(async() => {
      if(
        name!=""
        || (datetime != "" && datetime!=null)
        || height != ""
        || weight != ""
        || age != ""
        || zodiac != ""
        || Object.keys(image).length > 0
        || payment != ""
      ){
        const docRef = doc(db, "profiles",documentId);
        await updateDoc(docRef, {
          name: name,
          datetime: datetime,
          height: height,
          weight: weight,
          age: age,
          zodiac: zodiac,
          image: image,
          userId: currentUser.uid
        });
        console.log('added');
      }else{
        const docSnap = await getDoc((doc(db, "profiles",documentId)));
        // if(Object.keys(docSnap.data()).length == 1) 
        await deleteDoc(doc(db, "profiles",documentId))
        console.log('removed');
      }
      history('/home')
    }, 1);
  }

  const handleSubmit = () => () => {
    closeDrawer()()
  }

  const handleFileChange = (e,type) => {
    /**
     * This function saves all the images that the file picker picks to 
     * the firebase storage and adds the image info to the `image` state
     * object for rendering them to the UI.
     */
    toggleAutoSave()
    let files = Array.prototype.slice.call(e.target.files)
    files.forEach(file => {
      const storageRef = ref(storage, `images/${currentUser.uid}/${documentId}_${file.name}`)
      addToImageObect(`${documentId}_${file.name}`,file.name,type)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {}, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            addToImageObect(`${documentId}_${file.name}`,file.name, downloadURL,type)
          });
          toggleAutoSave()
        }
      );
    });
  }

  const addToImageObect= (uid,name,url,type) => {
    /**
     * This function maintains the `image` object's state responsible 
     * for showing the uploaded images as cards next to the upload button.
     */
    setImage(image => { 
      return {...image, [uid]: {
        "uid" : uid,
        "name" : name,
        "url" : url,
        "type" : type,
        "userId" : currentUser.uid
      }};
    });
  }

  const toggleAutoSave = () =>{
    setAutoSave(autoSave => !autoSave);
  }
  
  const onBlurHandle = () => {
    toggleAutoSave()
    const off = async () => setTimeout(() => {toggleAutoSave()}, 1000)
    off()
    return 
  }
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - ${drawerBleeding}px)`,
            width:'100%', overflow: 'visible'
          }
        }}
      />
      <SwipeableDrawer
        container={container} disableScrollLock={false} 
        anchor="bottom" open={open}
        onClose={closeDrawer()} onOpen={openDrawer()}
        swipeAreaWidth={drawerBleeding} disableSwipeToOpen={false}
        ModalProps={{keepMounted: true}}
      >
        <Container sx={{overflowY: 'scroll', mt:9}}>
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding, borderTopLeftRadius: 8,
            borderTopRightRadius: 8, visibility: 'visible',
            right: 0, left: 0, zIndex: 9
          }}
        >
          <Puller />
          <Container >
          <Stack direction="row" alignItems="center" sx={{justifyContent:'space-between'}}>
          <Stack sx={{ color: 'grey.500', mt:1.4 }} direction="row" alignItems="center">
            <Typography variant='h5' sx={{ py: 2, px:1, color: 'text.secondary' }}>
              {action=='new' && "Add a profile"}
              {action=='edit' && "Edit profile"}
            </Typography>
            {autoSave&& <Badge>
              <CircularProgress color="inherit" size="20px" />
              <Typography sx={{ p: 0, color: 'text.secondary',display:"flex",alignItems:"center" }}>
                Saving
              </Typography>
            </Badge>}
          </Stack>
          <Button onClick={closeDrawer()} sx={{fontSize:30}}><IoIosClose/></Button>
          </Stack>
          </Container>
        </StyledBox>
        <StyledBox component="form"
          sx={{ px: 2, pb: 2, mt:4, height: '200%',
            '& .MuiButton-root': { mb: 2 }
          }}
        >
          <Typography variant="h6">Upload images</Typography>
          <Typography variant="body2" sx={{mb:2}}>Upload multiple images. Favourably, a picture of the face, a full body shot, and others that you like.</Typography>
          
          <Grid container spacing={2} sx={{mb:2}}>
            <Grid xs={6} sm={3} item>
              <Card elevation={2} component={ButtonNoGutter} sx={{height:110}} >
                <Stack component="label" sx={{alignItems:"center", justifyContent:'center', height: "100%", width: "100%"}}>
                  <input type="file" onChange={event => handleFileChange(event,"profile-pic")} hidden multiple />
                  <IoIosAddCircleOutline size={40}/>
                  <Typography variant="body2" sx={{textTransform:'none'}}>Upload images</Typography>
                </Stack>
              </Card>
            </Grid>
            {Object.values(image).map((item)=>{
              if(item.type!="profile-pic") return
              return(<>
              <Grid xs={6} sm={3} item key="{item.url}">
                <Card elevation={2} sx={{height:110}} >
                  <Image src={item.url}/>
                </Card>
              </Grid>
              </>)
            })}
            
          </Grid>
          <Typography variant="h6">Enter details</Typography>
          <Typography variant="body2" sx={{mb:2}}>Enter corrent details. Remember to recheck date and time of birth.</Typography>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField value={name} inputRef={nameRef} required onChange={e => setName(e.target.value)} label="Fullname" onBlur={onBlurHandle} fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker 
              value={datetime} openTo="year"
              renderInput={(props) => <TextField onBlur={onBlurHandle} fullWidth {...props} />}
              label="Date and time of birth"
              onChange={(newValue) => { setDatetime(newValue);}}
            />
          </LocalizationProvider>  
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField value={zodiac} onChange={e => setZodiac(e.target.value)} label="Naal" onBlur={onBlurHandle} fullWidth variant="outlined" />  
          </Grid>
          <Grid item xs={6}>
          <TextField value={age} onChange={e => setAge(e.target.value)} label="Age" onBlur={onBlurHandle} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: "1" }} fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={6}>
          <TextField value={height} onChange={e => setHeight(e.target.value)} label="Height (in cm)" type="number" onBlur={onBlurHandle} fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={6}>
          <TextField value={weight} onChange={e => setWeight(e.target.value)} label="Weight (in kg)" type="number" onBlur={onBlurHandle} fullWidth variant="outlined" />
          </Grid>
          </Grid>
          <Typography variant="h6">Upload images</Typography>
          <Typography variant="body2" sx={{mb:2}}>Upload multiple images. Favourably, a picture of the face, a full body shot, and others that you like.</Typography>
          <Grid container spacing={2} sx={{mb:2}}>
            <Grid xs={6} sm={3} item>
              <Card elevation={2} component={ButtonNoGutter} sx={{height:110}} >
                <Stack component="label" sx={{alignItems:"center", justifyContent:'center', height: "100%", width: "100%"}}>
                  <input type="file" onChange={event => handleFileChange(event,"astrology-docs")} hidden multiple />
                  <IoIosAddCircleOutline size={40}/>
                  <Typography variant="body2" sx={{textTransform:'none'}}>Upload images</Typography>
                </Stack>
              </Card>
            </Grid>
            {Object.values(image).map((item)=>{
              if(item.type!="astrology-docs") return
              return(<>
              <Grid xs={6} sm={3} item key="{item.url}">
                <Card elevation={2} sx={{height:110}} >
                  <Image src={item.url}/>
                </Card>
              </Grid>
              </>)
            })}
          </Grid>
          <Stack direction="row" spacing={2} pt={2}>
          {(payment)? 
            <>
              <Button variant='contained' size='large' sx={{background:"green"}} startIcon={<RiShieldCheckFill />}>Paid</Button>
              <Button variant='contained' size='large' onClick={handleSubmit()}>Add profile</Button>
            </>:
            <>
              <Pay text="Pay ₹500" price={50000} documentId={documentId} disabled={false} />
              <Button disabled variant='contained' size='large' sx={{background:"green"}} onClick={handleSubmit()}>Add profile</Button>
            </>
            
          }
          </Stack>
          <Typography variant="body2" sx={{pb:3}}>
            Payment is secured by Razorpay (EV SSL, PCI DSS Level 1 compliant, HMAC SHA256).
          </Typography>
        </StyledBox>
        </Container>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;