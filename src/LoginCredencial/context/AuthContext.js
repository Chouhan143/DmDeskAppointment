import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

  //  fetch("https://srninfotech.com/projects/dmdesk/login", {
  //       email,
  //       password,
  //     })
  //     .then(res => {
  //       let userInfo = res.JSON();
  //       console.log(userInfo);
  //       setUserInfo(userInfo);
  //       AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  //       setIsLoading(false);
  //     })
  //     .catch(e => {
  //       console.log(`login error ${e}`);
  //       setIsLoading(false);
  //     });


  fetch('https://srninfotech.com/projects/dmdesk/login',{
    method: 'POST',
    email,
        password,
  })
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => {
    console.error(error);
  });
  }
;

  const logout = () => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.clear('userInfo');

        setUserInfo({});
        setIsLoading(false);
        AsyncStorage.clear()
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
