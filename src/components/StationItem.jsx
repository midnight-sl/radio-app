import React, {useContext, useState, useEffect} from 'react';
import {RadioContext} from '../containers/RadioContext';
import ReactPlayer from 'react-player'
import Controls from './Controls';
import callSpecificTracklist from '../api/callSpecificTracklist';
import '../styles/StationItem.css';

export default function StationItem({ id, title, type, description, tracklist, logo, ...props }) {
  const {currentStation, soundLevel, toggleControls, colorClassName, isPowerON } = useContext(RadioContext);
  
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [isPlayerActive, setPlayerActive] = useState(false);  
  
  const [trackData, setTrackData] = useState([]);
  const [songIndex, setSongIndex] = useState(0);
  
  const stationClassName = (currentStation === id) ? 'station-item active' : 'station-item';
  
  const getSongURLs = () => {
    callSpecificTracklist(id)
    .then(result => {
      setTrackData(result.data);
    }, 
    error => {
      console.error(error, "Error in URL fetch. Number of requests exceeded");
    });  
  }

  useEffect(() => {
    getSongURLs();
  },[isPowerON])


  const tracksInfo = trackData.map(({ album, artist, link, title }) => {
    const playlist = { artist: artist.name, songTitle: title, album: album.title, link: link, };
    return playlist;
  });
  
  const infoBlock = 
  <>
    <p>You are listening to {title} music on Deezer {type}. {(description) ? description : 'It'} can be reached online via <a href={tracklist}>{tracklist}</a></p>
    <p>{title} Playlist:</p>
    <ol>
      {tracksInfo.map(({ artist, songTitle, album }, key) => <li key={key}>{artist} - "{songTitle}" from "{album}" album.</li> )}
    </ol>
  </>

  const playerLink = tracksInfo[songIndex] ? (tracksInfo[songIndex].link) : "https://music.youtube.com/watch?v=qAxU9vNPqCg&list=RDAMVMqAxU9vNPqCg";

  const handleExtraInfoClick = () => setShowExtraInfo(!showExtraInfo);
  const handlePlayClick = () => setPlayerActive(!isPlayerActive);
  const handleNextClick = () => setSongIndex(songIndex + 1);

  return (
    <div className={`${stationClassName} ${colorClassName }`}>
      <div className="station-item-header"
        onClick={ () => toggleControls(id) }
        role="button"
        >
        <div className="station-base-info">
          <span className="station-name" >{title ? title : 'Some Title'}</span>
          <button className="play-btn" onClick={handlePlayClick}><img src="icons/play.png" alt="play button"/></button>
          <button className="extra-info-btn" onClick={handleExtraInfoClick}><i>More information</i> </button>
        </div>       
        <Controls 
          className="station-controls" 
          logo={logo} 
        /> 
      </div>
      <div className={ showExtraInfo ? 'info-active' : 'info-hidden' }>
        {infoBlock}
      </div>
      <div className={isPlayerActive ? 'player' : 'player player-hidden' } type="text/html" >
        <ReactPlayer 
          playing = {(isPlayerActive && currentStation)}
          url = { playerLink }
          volume= {soundLevel}
        />
      </div>
      <button className="next" onClick={handleNextClick}>Play Next Song</button>
    </div>
  );
}
