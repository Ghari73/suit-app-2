import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getUser, getTransactionsApi, transactions } from '../api/restApi';

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(0);

  const login = async (token, idUser) => {
    console.log(idUser);
    console.log(id);
    setUser(token);
    setId(idUser);
    console.log("ini id Usernya di Auth : ", id);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userId", idUser.toString());
    console.log("saving to userId ", idUser);
    return user;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("userToken");
  };

  const refreshToken = async () => {
    console.log(isAxiosError, "ini context");
    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  };

  const isLogin = async () => {
    let token = await AsyncStorage.getItem("userToken");
    if( token!= null) {
      return true
    } else {
      return false
    }
  }

  const getUserId = async () => {
    let userId = await AsyncStorage.getItem("userId");
    console.log(`get user id ${userId}`)
    return userId;
  }

  // const getUserData = async () =>{
  //     console.log('get user data authContext')
  //     const response = await getUser(user.token)
  //     console.log(response, "response")
  //     setUserData(response)
  // }

  // const transferTopUp = async (token, postData) =>{
  //     console.log('transfer di authContext')
  //     const response = await transactions(token, postData)
  //     console.log("aowkoakw", response)
  // }

  // const getTransactions = async () =>{
  //     try{
  //         console.log('getTransaction authContext')
  //         const response = await getTransactionsApi(user.token)
  //         console.log('koaskdpoaksd', response)

  //         let temp = response ? response : []

  //         setUserTransactions(temp.reverse())
  //     } catch (error){
  //         console.log('poipopipii',error)
  //     }

  // }

  // useEffect(() => {
  //     refreshToken();
  //     // if (user) {
  //     //     getUserData()
  //     // }
  // },[user])
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLogin,
        id,
        getUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
