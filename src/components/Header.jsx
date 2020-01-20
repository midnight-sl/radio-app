import React, {useContext} from 'react';
import { RadioContext } from '../containers/RadioContext';
import '../styles/Header.css';
import '../styles/ColorThemes.css';


export default function Header() {
  const {togglePowerButton} = useContext(RadioContext);
  const {toggleDarkTheme, toggleNeonTheme, togglePastelTheme, colorClassName } = useContext(RadioContext);

  const blockClassName = colorClassName + " header"

  return (
    <div className={blockClassName}>
      <p>Radio SimpleFM</p>
      <button className="powerButton"
        onClick={togglePowerButton}
        tabIndex="0"
        title="ON/OFF"> 
        <img src="../icons/off.png" alt="on/off button"/>
      </button>
      <div className="colorTheme">
        <button className="dark" onClick={toggleDarkTheme} title="Go to the Night mode">Night Mode</button>
        <button className="neon" onClick={toggleNeonTheme} title="Go to the Neon mode">Neon Mode</button>
        <button className="pastel" onClick={togglePastelTheme} title="Go to the Pastel mode">Pastel Mode</button>
      </div>  
    </div>
  )
}