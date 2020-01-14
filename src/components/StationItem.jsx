import React, {useContext, useState} from 'react';
import {RadioContext} from '../RadioContext';
import '../styles/StationItem.css';

export default function StationItem({ id, title, ...children }) {
  const {currentStation, toggleControls } = useContext(RadioContext);
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  const infoBlock = '<p>You are listening to {title} on Deezer {type}. {description} can be reached online via {tracklist} </p>'

  const stationClassName = currentStation === id ? 'station-item active' : 'station-item';

  return (
    <div className={stationClassName}>
      <div 
        className="station-item-header"
        onClick={() => toggleControls(id)}
        role="button"
      >
        <div className="station-base-info">
          <span className="station-name" onClick={ () => setShowExtraInfo(!showExtraInfo) }>{title}</span>
          {/* <span className="station-frequency">{frequency}</span> */}
        </div>       
        <div className={ showExtraInfo ? 'info-active' : 'info-hided' }>
          {infoBlock}
        </div>
      </div>
      <div className="station-controls">{children}</div>
    </div>
  );
}
