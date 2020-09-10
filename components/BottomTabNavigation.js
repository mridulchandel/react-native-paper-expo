import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  BottomNavigation,
  Portal,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { isEmpty } from "lodash";

import UserRoute from "./User.js";
import ProductRoute from "./Products.js";
import { useAppState } from "../StateProvider";

const RecentsRoute = () => <Text>Recents</Text>;

const BotttomTabNavigation = () => {
  const [{ userData }, dispatch] = useAppState();

  // For bottom navigator
  const [index, setIndex] = useState(0);

  const routes = [
    {
      key: "user",
      title: isEmpty(userData) ? "User" : userData.username,
      icon: "account",
    },
    { key: "products", title: "Products", icon: "album" },
    { key: "recents", title: "Recents", icon: "history" },
  ];

  // fetch userDetail
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users/1"),
          fetch("https://fakestoreapi.com/products?limit=10"),
        ]);
        const data1 = await response[0].json();
        const data2 = await response[1].json();
        const userErrorInfo = {
          ...data1,
          nameError: "",
          emailError: "",
          phoneError: "",
        };
        dispatch({
          type: "ADD_USER_DATA",
          data: userErrorInfo,
        });
        dispatch({
          type: "ADD_PRODUCT_DATA",
          data: data2,
        });
        dispatch({
          type: "SET_LOADING_DATA",
          data: false,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [dispatch]);

  // Render different scenes for different tabs
  const renderScene = BottomNavigation.SceneMap({
    user: UserRoute,
    products: ProductRoute,
    recents: RecentsRoute,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default BotttomTabNavigation;
