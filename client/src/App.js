import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';      // We import the BrowserRouter, Navigate, Route and Routes components from the react-router-dom package.
import HomePage from 'scene/homePage';                                       // We import the HomePage, LoginPage and ProfilePage components.
import LoginPage from 'scene/loginPage';
import ProfilePage from 'scene/profilePage';
import { useSelector } from 'react-redux';                                     // We import the useSelector hook from the react-redux package.  
import { useMemo } from 'react';                                            // We import the useMemo hook from the react package. 
import {CssBaseline, ThemeProvider} from '@mui/material';               // We import the CssBaseline and ThemeProvider components from the @material-ui/core package.
import {createTheme} from '@mui/material/styles';                      // We import the createTheme function from the @material-ui/core package.  
import {themeSettings} from './theme';                                  // We import the themeSettings function from the theme.js file.


/* The code above does the following:
1. We import the BrowserRouter component from the react-router-dom package. This component will be used to wrap the Routes component.
2. We import the Routes and Route components from the react-router-dom package. These components will be used to define the routes of our application.
3. We import the LoginPage, HomePage and ProfilePage components that we will use as page components.
4. We create the App component that will render the different page components in the routes we define.
5. We render the BrowserRouter component wrapping the Routes component.
6. We define the routes of our application using the Route component. We define three routes:
  6.1. The first route, with the path /, will display the LoginPage component.
  6.2. The second route, with the path /home, will display the HomePage component.
  6.3. The third route, with the path /profile/:userId, will display the ProfilePage component.
7. We export the App component as the default export of the module. */

function App() {

  const mode = useSelector((state) => state.mode);                    // We use the useSelector hook to get the mode from the state.
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);   // We use the useMemo hook to create the theme using the themeSettings function and the mode from the state.


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />                                                
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
