import React, {useContext} from 'react';
import { RadioContext } from '../RadioContext';

export default function Footer() {
  const {currentStation} = useContext(RadioContext);
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;
// wanted to call getStationsInfo on button click
//  onClick={RadioContextProvider}
  return(
    <div className="footer">
      {
        (currentStation || "no station") && (
          <>
            <p className="footer-station">Currently {currentStation} is playing</p>
            <button>Update Stations List</button>
            <p className="footer-time">{time}</p>
          </>
      )}
    </div>
  )
}