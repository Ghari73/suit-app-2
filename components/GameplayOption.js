import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import GameModal from "./GamePlayModal";

const GamePlayOption = ({ data, fontFamily, navigation }) => {
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const handleGameModal = () => {
    setGameModalVisible(!gameModalVisible);
    console.log(gameModalVisible);
  };

  return (
    <View style={styles.gameplayContainer}>
      <Image
        source={require("../assets/images/Ellipse Left.png")}
        style={[styles.circle, styles.leftCircle]}
      />
      <Image
        source={require("../assets/images/Ellipse Right.png")}
        style={[styles.circle, styles.rightCircle]}
      />

      {/* Player 1 */}
      <View style={styles.playerContainerLeft}>
        <Text style={[styles.playerTextLeft, { fontFamily: fontFamily }]}>
          {data.player1}
        </Text>
        <Image
          source={require("../assets/images/menuScissors.png")}
          style={styles.handImage}
        />
      </View>

      {/* VS Text */}
      <Text style={[styles.vsText, { fontFamily: fontFamily }]}>VS</Text>

      {/* Player 2 */}
      <View style={styles.playerContainerRight}>
        <Text style={[styles.playerTextRight, { fontFamily: fontFamily }]}>
          {data.player2}
        </Text>
        <Image
          source={require("../assets/images/menuRock.png")}
          style={styles.handImage}
        />
      </View>

      {/* Multi Player Button */}
      <TouchableOpacity style={styles.button} onPress={handleGameModal}>
        <Ionicons name={data.icon} size={34} color="white" />
        <Text style={[styles.buttonText, { fontFamily: fontFamily }]}>
          {data.type}
        </Text>
      </TouchableOpacity>
      <GameModal
        visible={gameModalVisible}
        handle={handleGameModal}
        fontFamily={fontFamily}
        data={data}
        navigation={navigation}
      />
    </View>
  );
};

export default GamePlayOption;

const styles = StyleSheet.create({
  gameplayContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    height: 346,
    borderRadius: 30,
  },
  circle: {
    position: "absolute",
    width: 180,
    height: 180,
    opacity: 0.3,
  },
  leftCircle: {
    top: "15%",
    left: 0,
  },
  rightCircle: {
    top: "30%",
    right: 0,
  },
  playerContainerLeft: {
    alignItems: "center",
    marginVertical: 20,
    //backgroundColor: "black",
    right: 50,
    width: "100%",
  },
  playerContainerRight: {
    alignItems: "center",
    marginVertical: 16,
    //backgroundColor: "black",
    left: 50,
    width: "100%",
    bottom: 22,
  },
  playerTextLeft: {
    fontSize: 20,
    marginTop: 10,
    alignSelf: "flex-end",
    color: "#000",
    fontSize: 24,
  },
  playerTextRight: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: "flex-start",
    color: "#000",
    fontSize: 24,
  },
  handImage: {
    width: 220,
    height: 220,
    resizeMode: "cover",
    top: -67,
    position: "absolute",
  },
  vsText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
  },
  button: {
    position: "absolute",
    bottom: 25,
    width: "98%",
    backgroundColor: "#D2691E",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
  },
});