import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './Context/Context.jsx'
import { Bounce, Flip, Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
    <ToastContainer 
    autoClose={1500} 
    transition ={Slide}/>
  </ContextProvider>

)
