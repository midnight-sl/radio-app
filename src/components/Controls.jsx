import React, {useContext} from 'react';
import {RadioContext} from '../containers/RadioContext';
import '../styles/Controls.css'


export default function Controls({ logo}) {
  const { toggleVolumeUp, toggleVolumeDown  } = useContext(RadioContext);
  
  return (
    <div className="controls">
      <button className="volume-down" onClick={toggleVolumeDown}><img src="icons/volumeDown.png" alt="volume down icon" /></button>
      <img className="station-logo" src={logo} alt="station logo" />
      <button className="volume-up"  onClick={toggleVolumeUp}><img src="icons/volumeUp.png" alt="volume up icon" /></button>
      <p></p>
    </div>
  );
}