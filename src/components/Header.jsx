import React, {useContext} from 'react';
import { RadioContext } from '../RadioContext';


export default function Header() {
  const {togglePowerButton} = useContext(RadioContext);
  const {toggleColorTheme} = useContext(RadioContext);

  return (
    <div className="header">
      <i>Radio SimpleFM</i>
      <button className="powerButton"
        onClick={togglePowerButton}
        tabIndex="0"> ON/OFF
        {/* <img src="../../public/icons/off.png" alt="on/off button"/> */}
      </button>
      <div className="colorTheme">
        <button className="dark" onClick={toggleColorTheme}>Night Mode</button>
        <button className="neon" onClick={toggleColorTheme}>Neon Mode</button>
        <button className="pastel" onClick={toggleColorTheme}>Pastel Mode</button>
      </div>  
    </div>
  )
}