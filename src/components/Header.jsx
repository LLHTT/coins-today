import { 
  AppBar, 
  Container, 
  Toolbar, 
  Typography, 
  Select, 
  MenuItem,
} from '@material-ui/core'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import AuthModal from "./Authentication/AuthModal"
import UserSidebar from './Authentication/UserSidebar'

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: '#00b7ff',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}))

const Header = () => {

  const classes = useStyles()

  const { currency, setCurrency, user } = CryptoState()
  console.log(currency)

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#10162f',
      },
      type: 'light'
    }
  })
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography 
              className={classes.title}
              variant='h6'
            >
              <Link to="/"> 
                Coins Today
              </Link>
            </Typography>

            <Select 
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"VND"}>VND</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
