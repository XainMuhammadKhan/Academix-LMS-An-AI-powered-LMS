import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import axios from 'axios'

// Ensure axios sends cookies (httpOnly/session) for all requests by default
axios.defaults.withCredentials = true


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
)
