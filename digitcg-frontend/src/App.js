import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from './navigation/NavBar';
import Routes from './routes/Routes';
import DigiBackendApi from './api/DigiBackendApi';
import useLocalStorage from './hooks/useLocalStorage';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './common/LoadingSpinner';
import jwt from "jsonwebtoken";
import UserContext from './auth/UserContext';


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "digitcg-token";


function App() {
  // to Await API fully loaded
  const [infoLoaded, setInfoLoaded] = useState(false);
  // saving User info
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("")
  const [update, setUpdate] = useState(false)
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  // const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );


  useEffect(function loadUserInfo() {
    console.debug("App userEffect loadUserInfo", "token=", token);


    async function getCurrentUser() {

      if (token) {

        try {

          let { username } = jwt.decode(token);
          setCurrentUsername(username)
          console.log("currentUsername", username)

          // put the token on the Api class so it can use it to call the API.
          DigiBackendApi.token = token;
          let currentUser = await DigiBackendApi.getUser(username);
          console.log("currentUser", currentUser)



          setCurrentUser(currentUser);
        }
        catch (err) {
          console.err(err);
          setCurrentUser(null);
        }

      }
      setInfoLoaded(true);

    }
    setUpdate(false)
    setInfoLoaded(false);
    getCurrentUser();

  }, [token, update]);


  async function signup(signupData) {
    try {
      let token = await DigiBackendApi.signup(signupData);
      setToken(token);
      return { success: true };
    }
    catch (err) {
      console.error("signup failed", err)
      return { success: false, err }
    }
  }
  async function login(loginData) {
    try {
      let token = await DigiBackendApi.login(loginData);
      setToken(token);
      return { success: true }
    }
    catch (errors) {
      console.error("login in failed", errors)
      return { success: false, errors }
    }
  }
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }


  if (!infoLoaded) return <LoadingSpinner />;


  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={
            { currentUser, setCurrentUser, currentUsername, setCurrentUsername, update, setUpdate }
          }
        >
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
