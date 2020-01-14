import React, {useContext} from 'react';
import { RadioContext } from '../RadioContext';
import StationItem from './StationItem';
import Controls from './Controls';

export default function StationsList() {
  const { stations, isInfoLoading, error } = useContext(RadioContext);

  const stationsList = stations.map(({ id, title, picture, tracklist, type }) => (
    <StationItem key={id} id={id} title={title} tracklist={tracklist} type={type}>
      <Controls logo={picture}/>
    </StationItem>
  ));

  const spinnerDiv = '<div id="spinner"><img src="../icons/loader.png" alt="loader" /></div>'


  return (
    <div className="stations-list"> 
      {error && (
        <p className="stations-list-error">Somethimg went wrong. Try one more time ;)</p>
      )}
      {isInfoLoading ? spinnerDiv : stationsList}
    </div>
  )
}