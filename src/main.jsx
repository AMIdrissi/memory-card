import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ClockTimer from './clock'
import GetInfo from './fetchData'
import GetImages from './fetchImages'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ClockTimer /> */}
    <GetInfo/>
    {/* <GetImages/> */}
  </React.StrictMode>,
)
