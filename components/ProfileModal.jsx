import { Image, Modal, SafeAreaView } from "react-native";
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
import { socket, updateUser } from "../api/restApi";
const ProfileModal = ({ visible, handle, fontFamily, UserId, navigation }) => {
  const [chosenImage, setChosenImage] = useState("");

  const URIimage = {
    1: "https://dl.dropboxusercontent.com/scl/fi/aere1x9yp4zbkq13iu0gh/Group-19.png?rlkey=fzy0c16m9mut5b7t6kzdsuc5c&st=bsesosa6&",
    2: "https://dl.dropboxusercontent.com/scl/fi/0esbunbiu2szeis8fddkr/Group-20.png?rlkey=a71a06ri7e7bvs55h26d51vql&st=bxchm0yu",
    3: "https://dl.dropboxusercontent.com/scl/fi/3zvhbpnv9atk7jqceknio/Group-21.png?rlkey=q08zp340mbn87jyea3os7v7e2&st=zhffudab",
    4: "https://dl.dropboxusercontent.com/scl/fi/amr3umpwteotwx2qhqjbk/Group-22.png?rlkey=xcue2de26z1h872wv3lb16i2h&st=3fxsqgb3",
    5: "https://dl.dropboxusercontent.com/scl/fi/o6zo5up55v0u3kj9nnmk3/Group-23.png?rlkey=86q7eoptwruu7zxkqco4eybbx&st=ymh7pqnw",
    6: "https://dl.dropboxusercontent.com/scl/fi/r83bbl2rw56btkmsatb0o/Group-24.png?rlkey=63dbtj1x5klk25xgcy6zqu04e&st=sks9gmsr",
  };

  const handleUpdateUser = async (avatarUrl) => {
    try {
      const response = await updateUser(UserId, avatarUrl);
      console.log(response);
      handle();
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
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
                  <Ionicons name="close-circle" size={30} color="#D27623" />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: -24,
                    fontFamily: fontFamily,
                    fontSize: 30,
                    color: "#D27623",
                  }}
                >
                  Pick Your Profile
                </Text>
                <View></View>
              </View>
              <View style={styles.profileContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateUser(URIimage[1]);
                  }}
                >
                  <Image
                    source={{
                      uri: URIimage[1],
                    }}
                    style={styles.profileAvatar}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateUser(URIimage[2]);
                  }}
                >
                  <Image
                    source={{
                      uri: URIimage[2],
                    }}
                    onError={(error) =>
                      console.log("Image load error:", error.nativeEvent)
                    }
                    style={styles.profileAvatar}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateUser(URIimage[3]);
                  }}
                >
                  <Image
                    source={{
                      uri: URIimage[3],
                    }}
                    style={styles.profileAvatar}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.profileContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateUser(URIimage[4]);
                  }}
                >
                  <Image
                    source={{
                      uri: URIimage[4],
                    }}
                    style={styles.profileAvatar}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateUser(URIimage[5]);
                  }}
                >
                  <Image
                    source={{
                      uri: URIimage[5],
                    }}
                    style={styles.profileAvatar}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateUser(URIimage[6]);
                  }}
                >
                  <Image
                    source={{
                      uri: URIimage[6],
                    }}
                    style={styles.profileAvatar}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default ProfileModal;

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
    height: 240,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  profileAvatar: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
});
