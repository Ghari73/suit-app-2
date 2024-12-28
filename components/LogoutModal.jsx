import { Modal, SafeAreaView } from "react-native";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
//import socket from "../api/socket";
import { useState } from "react";
import { socket } from "../api/restApi";
import { useAuth } from "../context/authContext";
const LogoutModal = ({ visible, handle, fontFamily, data, navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    handle();
    navigation.navigate("SignInScreen");
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <SafeAreaView
        style={{
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View style={[styles.container]}>
          <Text
            style={{
              fontFamily: fontFamily,
              color: "#2395D2",
              fontSize: 30,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Are You Sure You Want to Quit?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#D27623" }]}
              onPress={handleLogout}
            >
              <Text
                style={{ fontSize: 24, fontFamily: fontFamily, color: "white" }}
              >
                Yes, Quit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#2395D2" }]}
              onPress={handle}
            >
              <Text
                style={{ fontSize: 24, fontFamily: fontFamily, color: "white" }}
              >
                No, Stay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default LogoutModal;

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  container: {
    shadowColor: "black",
    width: "90%",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    height: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
  },
});
