import axios from 'axios'
import { CoinList } from './config/api'
import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const Crypto = createContext()

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("₫")
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  })  

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user)
      else setUser(null)
      // to see uid of user
      console.log(user)
    })
  }, [])

  const fetchCoins = async () => {
    setLoading(true)

    const { data } = await axios.get(CoinList(currency)) 
    setCoins(data)

    setLoading(false)
  }

  useEffect(() => {
    if (currency === "VND") setSymbol("₫")
    else if (currency === "USD") setSymbol("$")
  }, [currency])

  return (
    <Crypto.Provider 
      value={{ 
        currency,
        setCurrency, 
        symbol, 
        coins, 
        loading, 
        fetchCoins, 
        alert, 
        setAlert,
        user
      }}
    >
      {children}
    </Crypto.Provider>
  )
}

export const CryptoState = () => {
  return useContext(Crypto)
}

export default CryptoContext
