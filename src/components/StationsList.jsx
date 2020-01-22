import React, { useContext } from 'react';
import { RadioContext } from '../containers/RadioContext';
import StationItem from './StationItem';

import '../styles/StationList.css';
import '../styles/ColorThemes.css';


export default function StationsList() {
  const { stations, isInfoLoading, error, colorClassName } = useContext(RadioContext);
  const blockClassName = colorClassName + " stations-list";



  const stationsList = stations.map(({ id, title, picture, tracklist, type }) => (
      <StationItem key={id} id={id} title={title} tracklist={tracklist} type={type} logo={picture} />
  ));

  const spinnerDiv = <div id="spinner"><img src="icons/loader.png" alt="loader" /></div>


  return (
    <div className={blockClassName}> 
      {error && (
        <p className="stations-list-error">Somethimg went wrong. Try one more time ;)</p>
      )}
      {isInfoLoading ? spinnerDiv : stationsList}
    </div>
  )
}
