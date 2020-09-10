import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

// You can import from local files
import Main from "./components/Main";

// or any pure javascript modules available in npm
import { Provider as PaperProvider } from "react-native-paper";

import { useAppState } from "./StateProvider";
import { theme } from "./theme.js";
import { getData, removeValue } from "./util/asyncStorage";
import CustomModal from "./components/CustomModal";

export default function Paper() {
  // navigation stack initial route
  const [initialRoute, setInitialRoute] = useState(null);

  const [{ themeColor, loadingData }, dispatch] = useAppState();
  const currentTheme = theme[themeColor];

  // For checking whether loggedin or not
  useEffect(() => {
    async function checkingLoggedIn() {
      console.log(Boolean(await getData("loggedIn")), "checking");
      // await removeValue("loggedIn");
      if (Boolean(await getData("loggedIn"))) {
        setInitialRoute("Home");
      } else {
        setInitialRoute("SignIn");
        dispatch({
          type: "SET_LOADING_DATA",
          data: false,
        });
      }
    }
    checkingLoggedIn();
  }, []);

  return (
    <PaperProvider theme={currentTheme}>
      <CustomModal visible={loadingData} containerStyle={styles.container}>
        <ActivityIndicator animating={true} color="#228922" />
        <Text>Loading Data</Text>
      </CustomModal>
      <NavigationContainer>
        <StatusBar style={themeColor} />
        {initialRoute && <Main initialRoute={initialRoute} />}
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
});
