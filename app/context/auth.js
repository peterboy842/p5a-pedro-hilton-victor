import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null); 
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@finToken');

      if(storageUser) {
        try{
          api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
          const response = await api.get('/me');
          setUser(response.data);
        }catch(err){
          setUser(null);
        }
      }

      setLoadingAuth(false);
    }

    loadStorage();
  }, [])

  async function signOut(){
    await AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  async function signUp(email, password, nome){
    setLoadingAuth(true);

    try{
      const response = await api.post('/users', {
       name: nome,
       password: password,
       email: email,
      })
      setLoadingAuth(false);

      navigation.goBack();


    }catch(err){
      console.log("ERRO AO CADASTRAR", err.response?.data || err.message || err);
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password){
    setLoadingAuth(true);

    try{
      const response = await api.post('/login', {
        email: email,
        password: password
      })

      const { id, name, token } = response.data;

      await AsyncStorage.setItem('@finToken', token); 
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      })

      setLoadingAuth(false);

    }catch(err){
      console.log("ERRO AO LOGAR ", err.response?.data || err.message || err);
      setLoadingAuth(false);
    }

  }

  return(
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;