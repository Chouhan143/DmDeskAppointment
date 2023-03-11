import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { NewLoginUrl, NewLogoutUrl } from '../../Constants/UrlConstants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);



  const login = async (email, password) => {
    setIsLoading(true);
    await axios
      .post(NewLoginUrl, {
        email,
        password,
      })
      .then(async(res)  => {
        let userInformation = res.data;
        console.log(userInformation);
        setUserInformation(userInformation);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInformation));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };


  const logout = async () => {
    setIsLoading(true);

    try {
      await axios.post(
        NewLogoutUrl,
        { id: userInformation.id }, // include id in the request body
        {
          headers: { Authorization: `Bearer ${userInformation.access_token}` },
        }
      );

      console.log("Logout successful");

      await AsyncStorage.removeItem("userInformation");

      setUserInformation({});
    } catch (error) {
      console.log(`logout error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };



  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInformation);

      if (userInfo) {
        setUserInformation(userInformation);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInformation,
        splashLoading,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};
