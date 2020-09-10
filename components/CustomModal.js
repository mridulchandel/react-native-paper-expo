import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Text, ActivityIndicator, useTheme } from "react-native-paper";

const CustomModal = ({ visible, children, containerStyle }) => {
  const { colors } = useTheme();
  return (
    <Modal isVisible={visible}>
      <View style={[containerStyle, { backgroundColor: colors.background }]}>
        {children}
      </View>
    </Modal>
  );
};

export default CustomModal;
