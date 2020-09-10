import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  useTheme,
  Text,
  TouchableRipple,
  Button,
  TextInput,
  Appbar,
} from "react-native-paper";
import { isEmpty } from "lodash";

import Header from "./Header.js";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { useAppState } from "../StateProvider";

const User = ({ route }) => {
  // Getting userDetail from store
  const [{ userData }, dispatch] = useAppState();

  // Setting local userDetail for manipulation
  const [userInfo, setUserInfo] = useState({});

  const { colors } = useTheme();

  // Setting local userDetail initially from store
  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);

  // For editing local userDetail
  const editUserInfo = useCallback(
    (key, value) => {
      const updateUserInfo = { ...userInfo };
      updateUserInfo[key] = value;
      if (isEmpty(value.trim())) {
        updateUserInfo[key + "Error"] = "Invalid Input";
      } else {
        updateUserInfo[key + "Error"] = "";
      }
      setUserInfo(updateUserInfo);
    },
    [userInfo, setUserInfo]
  );

  // Saving edited data after validation
  const onSaveUserInfo = useCallback(() => {
    dispatch({
      type: "ADD_USER_DATA",
      data: userInfo,
    });
  }, [dispatch, userInfo]);

  const { name, email, phone, address } = userData;
  const { suite = "", street = "", city = "" } = !isEmpty(address) && address;

  // local state for userdetails editing modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  //  Rendering user detail
  const renderUserDetails = (label, value) => {
    return value?.trim() ? (
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>{label}: </Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    ) : null;
  };

  // For saving data on clicking save button
  const onSaveModal = () => {
    onSaveUserInfo();
    setIsModalVisible(false);
  };

  // For closing modal on clicking cross icon
  const onCloseModal = () => {
    setIsModalVisible(false);
    setUserInfo(userData);
  };

  // For rendering modal
  const renderModal = () => {
    const { name, email, phone, nameError, emailError, phoneError } = userInfo;
    return (
      <CustomModal
        visible={isModalVisible}
        containerStyle={styles.modalContainer}
      >
        <Appbar.Action
          style={styles.modalCross}
          color={colors.text}
          icon="alpha-x-circle-outline"
          onPress={onCloseModal}
        />
        <CustomInput
          label="Name"
          value={name}
          onChange={editUserInfo}
          inputKey="name"
          error={nameError}
        />
        <CustomInput
          label="Email"
          value={email}
          onChange={editUserInfo}
          inputKey="email"
          error={emailError}
          keyboardType="email-address"
        />
        <CustomInput
          label="Contact"
          value={phone}
          onChange={editUserInfo}
          inputKey="phone"
          error={phoneError}
          keyboardType="number-pad"
        />
        <CustomButton
          text="Save"
          clicked={onSaveModal}
          disabled={nameError || emailError || phoneError}
        />
      </CustomModal>
    );
  };

  return (
    <>
      <Header title={route.title} />
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Avatar.Image
            source={{
              uri:
                "https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png",
            }}
          />
          <View>
            {renderUserDetails("Name", name)}
            {renderUserDetails("Email", email)}
            {renderUserDetails("Contact", phone)}
            {renderUserDetails("Address", `${suite} ${street} ${city}`)}
          </View>
        </View>
        <CustomButton
          text="Edit User Details"
          clicked={() => setIsModalVisible(true)}
        />
      </View>
      {renderModal()}
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  userInfoContainer: {
    flexDirection: "row",
  },
  detailsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
  },
  label: {
    width: "22%",
  },
  value: {
    width: "70%",
  },
  modalContainer: {
    borderRadius: 10,
  },
  modalCross: {
    alignSelf: "flex-end",
  },
});
