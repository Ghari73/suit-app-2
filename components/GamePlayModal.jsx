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
const GameModal = ({ visible, handle, fontFamily, data, navigation}) => {
  const [room, setRoom] = useState("");

  const handleJoinRoom = () => {
    if (room.trim()) {
      socket.emit("join-room", room);
      navigation.navigate("GamePlayScreen", { data: room });
      handle();
    } else {
      alert("Please enter a valid room name!");
    }
  };

  if (visible) {
    console.log("Muncul Ges");
  }
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
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={handle}>
                  <Ionicons name="close-circle" size={30} color="red" />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: -24,
                    fontFamily: fontFamily,
                    fontSize: 30,
                    color: "red",
                  }}
                >
                  {data.type}
                </Text>
                <View></View>
              </View>
              <TouchableOpacity
                onPress={handleJoinRoom}
                style={{
                  backgroundColor: "#19918F",
                  margin: 15,
                  padding: 20,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  New Room
                </Text>
              </TouchableOpacity>
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
                    fontSize: 30,
                    color: "red",
                  }}
                >
                  Enter Room
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
                <TextInput
                  placeholder="Enter Room"
                  onChangeText={setRoom}
                  style={{
                    backgroundColor: "white",
                    margin: 15,
                    padding: 20,
                    height: 30,
                    borderRadius: 10,
                    width: "90%",
                    borderWidth: 1,
                  }}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default GameModal;

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
    height: 360,
  },
});
