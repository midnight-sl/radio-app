import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const RadioContext = React.createContext(null);

export default function RadioContextProvider(props) {
  const [stations, setStations] = useState([]);
  const [currentStation, setCurrentStation] = useState('no station');
  const [error, setError] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [colorTheme, setColorTheme] = useState(['background: #FFF']);

  useEffect(() => {
    colorTheme.join(';');
    console.log('seems the styles are working', colorTheme);
    getStationsInfo(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[colorTheme]);

  const getStationsInfo =  () => {
    setError(false);
    const apiResponse = fetch('https://api.deezer.com/radio/top', {
      method: "GET",
      mode: 'no-cors'
    })
    .then(response => {
      setStations(response.data);
      setIsInfoLoading(false);
      console.log(stations);
      console.log(apiResponse);
    })
    .catch(err => {
      console.log(err, 'ERROR IN FETCH');
      setIsInfoLoading(false);
      setError(true);
    });
    // const response = await fetch("https://api.deezer.com/radio/top");
    // const myJson = await response.json();
    // console.log(JSON.stringify(myJson));
  }
  
  const togglePowerButton = () => {
    if (currentStation) {
      setCurrentStation('');
    } else {
      const lastPlayedStation = localStorage.getItem('current-station') || 
      'Click on any station to start listening';
      setCurrentStation(lastPlayedStation);
    }
  };
  
  const toggleControls = name => {
    if (currentStation === name) {
      setCurrentStation('');
    } else {
      setCurrentStation(name);
      localStorage.setItem('current-station', name);
    }
  };

  const toggleColorTheme = color => {
    if (color !== colorTheme) {
      setColorTheme(color);
    }
  }

  return (
    <RadioContext.Provider
      value={{
        stations,
        currentStation,
        error,
        isInfoLoading,
        togglePowerButton,
        toggleControls,
        toggleColorTheme
      }}
    >
      {props.children}
    </RadioContext.Provider>
  );
}

const { arrayOf, bool, func, number, shape, string } = PropTypes;

RadioContext.Provider.propTypes = {
  value: shape({
    currentStation: string.isRequired,
    isInfoLoading: bool.isRequired,
    togglePowerButton: func.isRequired,
    stations: arrayOf(
      shape({
        id: number.isRequired,
        title: string.isRequired,
        description: string,
        share: string,
        picture: string,
        picture_small: string,
        picture_medium: string,
        picture_big: string,
        picture_xl: string,
        tracklist: string,
        type: string      
      })
    ),
    toggleControls: func.isRequired,
    toggleColorTheme: func,
  }).isRequired,
};