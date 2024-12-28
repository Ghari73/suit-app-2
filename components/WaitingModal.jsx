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
import socket from "../api/socket";
import { useState } from "react";
const WaitingModal = ({ visible, fontFamily, data }) => {
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
          <View style={{ padding: 0 }}>
            <View style={{ gap: 20 }}>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginLeft: -24,
                    fontFamily: fontFamily,
                    fontSize: 30,
                    color: "#2395D2",
                  }}
                >
                  Room created!
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily,
                    fontSize: 30,
                    color: "#2395D2",
                    textAlign: "center",
                  }}
                >
                  Invite your friend using this code
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily,
                    fontSize: 60,
                    color: "red",
                  }}
                >
                  {data}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default WaitingModal;

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
    height: 260,
  },
});
