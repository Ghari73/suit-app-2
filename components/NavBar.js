import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import { User } from "lucide-react-native";

const NavBar = ({ Avatar, Username, fontFamily, UserId, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const handleModal = () => {
    setVisible(!visible);
  };
  const handleProfileModal = () => {
    setProfileVisible(!profileVisible);
  };
  return (
    <>
      <View style={styles.navbarContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={handleProfileModal}>
            <Image source={{ uri: Avatar }} style={styles.avatarStyle}></Image>
          </TouchableOpacity>
          <View style={styles.player}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 25,
                fontFamily: fontFamily,
              }}
            >
              {Username}
            </Text>
            <Text style={{ color: "white", fontWeight: "bold" }}>Suwlit</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleModal}>
          <SimpleLineIcons name="logout" size={24} color="yellow" />
        </TouchableOpacity>
      </View>
      <LogoutModal
        handle={handleModal}
        visible={visible}
        fontFamily={fontFamily}
        navigation={navigation}
      />
      <ProfileModal
        handle={handleProfileModal}
        visible={profileVisible}
        fontFamily={fontFamily}
        navigation={navigation}
        UserId={UserId}
      />
    </>
  );
};

export default NavBar;

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
  },
  player: {
    flexDirection: "column",
  },
});
