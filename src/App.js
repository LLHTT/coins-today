import './App.css'
import Header from './components/Header'
import Homepage from './Pages/Homepage'
import CoinPage from './Pages/CoinPage'
import { makeStyles } from '@material-ui/core'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#fff",
    minHeight: "100vh",
  }
}))

function App() {
  const classes = useStyles()

  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
