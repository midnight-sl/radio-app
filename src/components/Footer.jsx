import React, {useContext} from 'react';
import { RadioContext } from '../containers/RadioContext';
import '../styles/Footer.css';
import '../styles/ColorThemes.css';


export default function Footer() {
  const {currentStation, stations, colorClassName} = useContext(RadioContext);
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;
  const stringifiedCurrentStation = currentStation ? currentStation.toString() : "";

  const findCurrentStation = stations.find(el => el.id === stringifiedCurrentStation);
  const stationTitle = findCurrentStation ? findCurrentStation.title : "NO station";
  const blockClassName = colorClassName + " footer";

  return(
    <div className={blockClassName}>
      {
        (currentStation || "no station") && (
          <>
            <p className="footer-station">Currently {stationTitle} is playing</p>
            <p className="footer-time">{time}</p>
            <p className="credentials">Made by Sofi</p>
          </>
      )}
    </div>
  )
}
