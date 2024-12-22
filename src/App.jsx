import React from 'react'
import { useState } from 'react'
import './components/Weather.jsx'
import Weather from './components/Weather.jsx'
import toggle_icon from './assets/images/toggle.png'

const App = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };



  return (
    <div className='app'>
       <img src={toggle_icon} className="mode-icon" onClick={toggleDarkMode}/>
        <Weather/>
    </div>
  )
}

export default App