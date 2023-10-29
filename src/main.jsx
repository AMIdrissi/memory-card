import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ClockTimer from './clock'
import GetInfo from './fetchData'
import GetImages from './fetchImages'
import SelectAnswer from './selectBox'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ClockTimer /> */}
    <GetInfo url={'hhttps://pokeapi.co/api/v2/pokemon/?offset=0&limit='} limit={60}/>
    {/* <GetImages/> */}
  </React.StrictMode>,
)
