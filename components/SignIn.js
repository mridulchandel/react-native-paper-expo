import React, { useEffect } from "react";

import CustomButton from "./CustomButton";
import { storeData } from "../util/asyncStorage";
import Header from "./Header";
import { useAppState } from "../StateProvider";

function SignIn({ navigation }) {
  const [{ loadingData }, dispatch] = useAppState();
  const onSignIn = () => {
    storeData("loggedIn", "true");
    navigation.navigate("Home");
    dispatch({
      type: "SET_LOADING_DATA",
      data: true,
    });
  };
  return (
    <>
      <Header title="Sign In" />
      <CustomButton text="Save" clicked={onSignIn} />
    </>
  );
}

export default SignIn;
