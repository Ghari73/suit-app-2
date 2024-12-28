import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "../assets/images/Logo.png";

const NavigationBar = () => {
  <View style={styles.navbarContainer}>
    <View>
      <Image source={Avatar} style={styles.avatarStyle}></Image>
      <View style={styles.playerContainer}>
        <Text>Player 1</Text>
        <Text>Suwlit</Text>
      </View>
    </View>
    <View></View>
  </View>;
};

const styles = StyleSheet.create({
  avatarStyle: {
    borderRadius: 30,
    height: 46,
    width: 46,
  },
  navbarContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    height: "80",
    backgroundColor: "white",
  },
  playerContainer: {
    flexDirection: "column",
  },
});
export default NavigationBar;
