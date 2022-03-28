import 'react-alice-carousel/lib/alice-carousel.css'
import App from './App'
import ReactDOM from 'react-dom'
import CryptoContext from './CryptoContext'

ReactDOM.render(
  <CryptoContext>
    <App />
  </CryptoContext>,
  document.getElementById('root')
)
