import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Logo from "../assets/images/logo.png";

const Header = ({ fontFamily }) => {
  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity>
        <FontAwesome
          name="arrow-circle-left"
          size={36}
          color="white"
          style={{ marginRight: -46, marginLeft: 10 }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 10,
        }}
      >
        <Image source={Logo} style={{ height: 150, width: 150 , resizeMode: "contain"}} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  avatarStyle: {
    borderRadius: 30,
    height: 46,
    width: 46,
  },
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    height: "80",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
