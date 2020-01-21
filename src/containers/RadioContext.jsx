import React, {useState, useEffect} from 'react';
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
  },[isThemeDark,isThemeNeon,isThemePastel]);

  const getStationsInfo = () => {
    callRadioService()
    .then(result => {
      setStations(result.data);
      setIsInfoLoading(false);
    }, 
    (error) => {
      console.error(error, "Error in Stations Info fetch");
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
    } else {
      setSoundLevel(soundLevel);
    }
  }
  const toggleVolumeDown = () => {
    if (soundLevel >= (0.1)) {
    setSoundLevel(soundLevel - 0.1);
    } else {
      setSoundLevel(soundLevel);
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
