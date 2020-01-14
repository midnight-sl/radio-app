import React from 'react';

export default function Controls({ logo }) {

  return (
    <div className="controls">
      <button className="volume-down"><img src="../../public/icons/volumeDown.png" alt="volume down icon"/></button>
      <img className="station-logo" src={logo} alt="station logo" />
      <button className="volume-up"><img src="../../public/icons/volumeUp.png" alt="volume up icon"/></button>
    </div>
  );
}