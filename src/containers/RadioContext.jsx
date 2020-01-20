import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import callRadioService from '../api/callRadioService';

export const RadioContext = React.createContext(null);

export default function RadioContextProvider(props) {
  const [stations, setStations] = useState(['0', 'title', 'picture url', 'tracklist', 'type' ]);
  const [currentStation, setCurrentStation] = useState('no station');
  const [error, setError] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [soundLevel, setSoundLevel] = useState(0.5);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isThemeNeon, setIsThemeNeon] = useState(false);
  const [isThemePastel, setIsThemePastel] = useState(false);
  const [colorClassName, setColorClassName] = useState('');

  useEffect(() => {
    getStationsInfo(); 
    console.log(isThemeDark,isThemeNeon,isThemePastel, "isThemeDark,isThemeNeon,isThemePastel");
  },[isThemeDark,isThemeNeon,isThemePastel]);

  const getStationsInfo = () => {
    callRadioService()
    .then(result => {
      setStations(result.data);
      setIsInfoLoading(false);
    }, 
    error => {
      console.error(error);
      setIsInfoLoading(false);
      setError(true);
    });    
  }    

  const togglePowerButton = () => {
    if (currentStation) {
      setCurrentStation('');
    } else {
      const lastPlayedStation = localStorage.getItem('current-station');
      setCurrentStation(lastPlayedStation);
    }
  };
  
  const toggleControls = id => {
    if (currentStation === id) {
      setCurrentStation('');
    } else {
      setCurrentStation(id);
      localStorage.setItem('current-station', id);
    }
  };

  const toggleDarkTheme = () => {
    setIsThemeDark(!isThemeDark);
    setIsThemeNeon(false);
    setIsThemePastel(false);
    checkColorTheme();
  }
  const toggleNeonTheme = () => {
    setIsThemeNeon(true);
    setIsThemeDark(false);
    setIsThemePastel(false);
    checkColorTheme();
  }
  const togglePastelTheme = () => {
    setIsThemePastel(true);
    setIsThemeDark(false);
    setIsThemeNeon(false);
    checkColorTheme();
  }

  const checkColorTheme = () => {
    if (isThemeDark) {
      setColorClassName("dark-theme color-theme");
    } else if (isThemeNeon) {
      setColorClassName("neon-theme color-theme");
    } else if (isThemePastel) {
      setColorClassName("pastel-theme color-theme");
    } else {
      setColorClassName("");
    }
  }

  const toggleVolumeUp = () => {
    if (soundLevel <= (0.9)) {
    setSoundLevel(soundLevel + 0.1);
    console.log('the sound was turned up a bit');
    console.log(soundLevel,'sound Level');
    } else {
      setSoundLevel(soundLevel);
      console.log('the sound is MAXIMAL');
    }
  }
  const toggleVolumeDown = () => {
    if (soundLevel >= (0.1)) {
    setSoundLevel(soundLevel - 0.1);
    console.log('the sound was turned down a bit');
    console.log(soundLevel,'sound Level');
    } else {
      setSoundLevel(soundLevel);
      console.log('the sound is MINIMAL');
    }
  }

  return (
    <RadioContext.Provider
      value={{
        stations,
        currentStation,
        error,
        isInfoLoading,
        soundLevel,
        colorClassName,
        togglePowerButton,
        toggleControls,
        toggleDarkTheme,
        toggleNeonTheme,
        togglePastelTheme,
        toggleVolumeUp,
        toggleVolumeDown
      }}
    >
      {props.children}
    </RadioContext.Provider>
  );
}

// const { arrayOf, bool, func, number, shape, string } = PropTypes;

// RadioContext.Provider.propTypes = {
//   value: shape({
//     currentStation: string.isRequired,
//     isInfoLoading: bool.isRequired,
//     togglePowerButton: func.isRequired,
//     stations: arrayOf(
//       shape({
//         id: number.isRequired,
//         title: string.isRequired,
//         description: string,
//         share: string,
//         picture: string,
//         picture_small: string,
//         picture_medium: string,
//         picture_big: string,
//         picture_xl: string,
//         tracklist: string,
//         type: string      
//       })
//     ),
//     toggleControls: func.isRequired,
//     toggleColorTheme: func,
//   }).isRequired,
// };