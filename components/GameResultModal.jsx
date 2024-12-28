import { Modal, SafeAreaView } from "react-native";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
import socket from "../api/socket";
import { useState } from "react";

import Draw from "../assets/images/Draw.png";
import Win from "../assets/images/Win.png";
import Lose from "../assets/images/Lose.png";

const GameResultModal = ({ visible, fontFamily, data,navigation,onClose }) => {
  let image = null
  if(data == "Win") {
    image = Win
  } else if(data == "Lose") {
    image = Lose
  } else {
    image = Draw
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
            }}>
            <TouchableOpacity onPress={() => {
              onClose()
              navigation.goBack()
            }}>
                <Image
                    source={image}
                    style = {styles.image}
                />
                <Text style={styles.closeText}>
                    Click anywhere to close
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    </Modal>
  );
};
export default GameResultModal;

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  image: {
    width: 250,
    height: 250
  },
  closeText: {
    fontSize: 16,
    fontWeight: 700,
    color: "white",
    textAlign: "center"
  },
  container: {
    shadowColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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