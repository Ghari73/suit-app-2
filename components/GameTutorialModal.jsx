import { Image, Modal, SafeAreaView } from "react-native";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AIpaper from "../assets/images/AIpaperRight.png";
import AIrock from "../assets/images/AIrockRight.png";
import AIscissors from "../assets/images/AIscissorsRight.png";
import HumanPaper from "../assets/images/HUMANpaperLeft.png";
import HumanRock from "../assets/images/HUMANrockLeft.png";
import HumanScissors from "../assets/images/HUMANscissorsLeft.png";
import Ionicons from "@expo/vector-icons/Ionicons";
const GameTutorialModal = ({ visible, handle, fontFamily }) => {
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
              <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={handle}>
                  <Ionicons name="close-circle" size={30} color="red" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    fontFamily: fontFamily,
                    color: "#D27623",
                  }}
                >
                  Game Play Tutorial
                </Text>
                <Text></Text>
              </View>
              <Text style={{ fontSize: 14 }}>
                Play solo against a bot or challenge a friend by creating or
                joining a room. Each match has 5 rounds—outsmart your opponent
                to win! Choose rock, paper, or scissors and let the battle
                begin.{" "}
              </Text>
              <View
                style={[
                  styles.elementContainer,
                  { marginHorizontal: 40, marginVertical: 0 },
                ]}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#2395D2",
                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  WIN
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#D27623",
                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  LOSE
                </Text>
              </View>
              <View style={styles.elementContainer}>
                <Image
                  style={{ height: 130, width: 130, resizeMode: "contain" }}
                  source={HumanRock}
                ></Image>
                <Image
                  source={AIscissors}
                  style={{ height: 130, width: 130, resizeMode: "contain" }}
                ></Image>
              </View>
              <View
                style={[
                  styles.elementContainer,
                  { marginHorizontal: 40, marginVertical: 0 },
                ]}
              >
                <Text
                  style={{
                    fontSize: 30,

                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  Rock
                </Text>
                <Text
                  style={{
                    fontSize: 30,

                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  Scissors
                </Text>
              </View>
              <View style={styles.elementContainer}>
                <Image
                  style={{ height: 130, width: 130, resizeMode: "contain" }}
                  source={HumanScissors}
                ></Image>
                <Image
                  source={AIpaper}
                  style={{ height: 130, width: 130, resizeMode: "contain" }}
                ></Image>
              </View>
              <View
                style={[
                  styles.elementContainer,
                  { marginHorizontal: 40, marginVertical: 0 },
                ]}
              >
                <Text
                  style={{
                    fontSize: 30,

                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  Scissors
                </Text>
                <Text
                  style={{
                    fontSize: 30,

                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  Paper
                </Text>
              </View>
              <View style={styles.elementContainer}>
                <Image
                  style={{ height: 130, width: 130, resizeMode: "contain" }}
                  source={HumanPaper}
                ></Image>
                <Image
                  source={AIrock}
                  style={{ height: 130, width: 130, resizeMode: "contain" }}
                ></Image>
              </View>
              <View
                style={[
                  styles.elementContainer,
                  { marginHorizontal: 40, marginVertical: 0 },
                ]}
              >
                <Text
                  style={{
                    fontSize: 30,

                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  Paper
                </Text>
                <Text
                  style={{
                    fontSize: 30,

                    fontWeight: "bold",
                    fontFamily: fontFamily,
                  }}
                >
                  Rock
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default GameTutorialModal;

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
    height: 600,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  elementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: -40,
  },
});
