import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./AuthContext";
import GuestStack from "./navigation/GuestStack";
import AppStack from "./navigation/AppStack";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

const Navigation = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; 

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};