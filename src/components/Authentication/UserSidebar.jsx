import { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CryptoState } from '../../CryptoContext'
import { Avatar, Button } from '@material-ui/core'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import Drawer from '@material-ui/core/Drawer'

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#11a9e6",
    marginTop: 20,
  },
  picture: {
    width: 150,
    height: 150,
    cursor: "pointer",
    backgroundColor: "#11a9e6",
    objectFit: "contain",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
})

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  })

  const { user, setAlert } = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const logOut = () => {
    signOut(auth)

    setAlert({
      open: true,
      message: 'Logout successful',
      type: 'success'
    })

    toggleDrawer()
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#11a9e6",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </Fragment>
      ))}
    </div>
  )
}
