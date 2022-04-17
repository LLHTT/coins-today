import { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CryptoState } from '../../CryptoContext'
import { Avatar, Button } from '@material-ui/core'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase'
import Drawer from '@material-ui/core/Drawer'
import { numberWithCommas } from './../Banner/Carousel'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { doc, setDoc } from 'firebase/firestore'

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
    backgroundColor: "#c4c4c4",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
})

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  })

  const { user, setAlert, watchlist, coins, symbol } = CryptoState()

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

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid)
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((watch) => watch !== coin?.id) },
        { merge: "true" }
      )
      setAlert({
        open: true,
        message: `${coin.name} removed from the Watchlist !`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
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
                  <span style={{ fontSize: 15, fontWeight: "bold" }}>
                    Watchlist
                  </span>

                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id)) 
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: 'flex', gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <RiDeleteBack2Fill 
                              style={{ cursor: 'pointer' }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      )
                  })}
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
