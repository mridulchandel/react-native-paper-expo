import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

// You can import from local files
import Main from "./components/Main";

// or any pure javascript modules available in npm
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from "react-native-paper";

import Paper from "./Paper";
import { StateProvider } from "./StateProvider";
import contextReducer, { initialState } from "./contextReducer";

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={contextReducer}>
      <Paper />
    </StateProvider>
  );
}
