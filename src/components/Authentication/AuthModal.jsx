import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, AppBar, Tabs, Tab, Box } from '@material-ui/core/'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Login from './Login'
import Signup from './Signup'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // custom the panel popup in Modal 
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "#000",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 13,
    fontFamily: "Inter"
  },
}))

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  const { setAlert } = CryptoState()

  // for Button & Modal
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  // for Tabs
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: "true",
          message: `Sign up successful. Welcome ${res.user.email}`,
          type: "success"
        })
        handleClose()
      })
      .catch(error => {
        setAlert({
          open: "true",
          message: error.message,
          type: "error"
        })
      })
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          backgroundColor: "#11a9e6",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "#000",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            
            {/* CONDITION FOR VALUE OF TABS (1, 2) */}
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}

            {/* GOOGLE AUTHENTICATION */}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton 
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
