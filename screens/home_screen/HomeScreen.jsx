import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import Avatar from "../../assets/images/logo-hand-only.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "react-native-reanimated-carousel";
import Background from "../../assets/images/background.png";
import NavBar from "../../components/NavBar";
import GamePlayOption from "../../components/GameplayOption";
import Leaderboards from "../../components/Leaderboards";
import ModalComponent from "../../components/GameTutorialModal";
import * as Font from "expo-font";
import { useAuth } from "../../context/authContext";
import { fetchAllUser, fetchLeaderboards, fetchUser } from "../../api/restApi";

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [leaderBoards, setLeaderBoards] = useState({});
  const [focusedItem, setFocusedItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [accountData, setAccountData] = useState({});
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, getUserId } = useAuth();

  const getDataUser = async () => {
    try {
      const idUser = await getUserId();
      setLoading(true);
      const data = await fetchUser(idUser);
      setAccountData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const getAllUser = async () => {
    try {
      setLoading(true);
      const data = await fetchLeaderboards();

      setAllUsers(data);

      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    getDataUser();
    getAllUser();
  }, []);

  useEffect(() => {
    Font.loadAsync({
      LilitaOne: require("../../assets/fonts/LilitaOneRegular.ttf"), // Path to the font file
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, add a loading spinner here
  }

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleGameModal = () => {
    setGameModalVisible(!modalVisible);
  };

  const onScroll = (index) => {
    setFocusedItem(gameplayData[index]);
  };

  const gameplayData = [
    {
      index: 1,
      type: "Multi Player",
      icon: "people-sharp",
      player2: "Player 1",
      player1: "Player 2",
      hand: "Player 2",
    },
    {
      index: 2,
      type: "Single Player",
      icon: "person",
      player2: "Player 1",
      player1: "Computer",
      hand: "Computer",
    },
  ];
  const fontFamily = "Lilita One";

  return (
    <ImageBackground source={Background} style={styles.background}>
      <SafeAreaView>
        <NavBar
          Avatar={accountData.avatar_url}
          Username={accountData.username}
          fontFamily={fontFamily}
          navigation={navigation}
          UserId={accountData.id}
        />
        <View style={styles.container}>
          {/* <GamePlayOption /> */}
          <View style={{ height: 346 }}>
          <GamePlayOption data={gameplayData[0]} fontFamily={fontFamily} navigation={navigation}/>
            {/* <Carousel
              width={362}
              height={346}
              data={gameplayData}
              renderItem={({ item }) => (
                <View>
                  <GamePlayOption
                    data={item}
                    fontFamily={fontFamily}
                    navigation={navigation}
                  />
                </View>
              )}
              onSnapToItem={onScroll}
            /> */}
          </View>
          <TouchableOpacity style={styles.buttonTutorial} onPress={handleModal}>
            <Ionicons
              name="game-controller-outline"
              size={46}
              color="black"
              style={{ color: "#266489" }}
            />
            <Text
              style={{
                fontSize: 24,
                color: "#266489",
                fontFamily: fontFamily,
              }}
            >
              Gameplay Tutorial
            </Text>
          </TouchableOpacity>
          <Leaderboards
            Avatar={Avatar}
            fontFamily={fontFamily}
            navigation={navigation}
            Users={allUsers}
            UserId={accountData.id}
          />
        </View>
      </SafeAreaView>
      <ModalComponent
        visible={modalVisible}
        handle={handleModal}
        fontFamily={fontFamily}
        UserId={accountData.id}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 30,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  background: {
    height: screenHeight,
    width: screenWidth,
  },
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
  buttonTutorial: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    height: 60,
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
  },
  wrapper: { flex: 1, height: 400 },
});

export default HomeScreen;
