import './App.css';
import React, { useState } from 'react';
import Router from './Router';


export const GeneralContext = React.createContext();


function App() {
    const [isLoader, setIsLoader] = useState(true);
    const [snackbarText, setSnackbarText] = useState('');

    const snackbar = text => {
      setSnackbarText(text);
      setTimeout(() => setSnackbarText(''), 3 * 1000);
    }
    
  return (
    <GeneralContext.Provider value={{isLoader ,setIsLoader, snackbar, snackbarText}}>
      <Router />
    </GeneralContext.Provider>
  );
}

export default App;
