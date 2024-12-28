import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useFonts } from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { fetchLeaderboards, fetchUser } from "../../api/restApi";
import { useAuth } from "../../context/authContext"; //penambahan

const LeaderboardScreen = () => {
  const userId = 4 // ID pengguna saat ini  
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { id } = useAuth(); //penambahan
  const [fontsLoaded] = useFonts({
    'LilitaOne-Regular': require("../../assets/fonts/LilitaOneRegular.ttf"),
  });

  useEffect(() => {
    const getRankingData = async () => {
      try {
        const rankingData = await fetchLeaderboards();
        console.log("Fetched leaderboard data:", rankingData);

        if (Array.isArray(rankingData)) {
          const sortedData = rankingData.sort((a, b) => b.point - a.point);

          const rankedData = sortedData.map((item, index) => ({
            ...item,
            rank: index + 1,
            isUser: item.user_id === id ? "yes" : "no", //perubahan
          }));

          setData(rankedData);
        } else {
          console.error("Invalid data format from API:", rankingData);
        }
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
      }
    };

    getRankingData();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const isUser = item.isUser === "yes";
    const isTopThree = item.rank <= 3;
  
    const medalIcons = {
      1: require("../../assets/images/gold-medal.png"),
      2: require("../../assets/images/silver-medal.png"),
      3: require("../../assets/images/bronze-medal.png"),
    };
  
    const rowStyle = isUser ? styles.userRow : styles.defaultRow;
    const textStyle = isUser ? styles.userText : styles.defaultText;
  
    return (
      <View style={[styles.row, rowStyle]}>
        <View style={styles.rankContainer}>
          {isTopThree ? (
            <Image source={medalIcons[item.rank]} style={styles.medal} />
          ) : (
            <Text style={[styles.rank, textStyle]}>{item.rank}</Text>
          )}
        </View>
        <Image style={styles.avatar} source={{ uri: item?.User?.avatar_url || "" }} />
        <Text style={[styles.name, textStyle]}>{item?.User?.username || "Unknown"}</Text>
        <Text style={[styles.score, textStyle]}>{item.point}</Text>
      </View>
    );
  };
  

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../assets/images/back-icon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
      </View>
      <Text style={styles.header}>Leaderboard</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 48,
    marginVertical: 25,
    height: 120,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logo: {
    width: 120,
    height: 35,
    resizeMode: "contain",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 35,
    marginTop: -35,
    color: "#fff",
    fontFamily: "LilitaOne-Regular",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  defaultRow: {
    backgroundColor: "#fff",
  },
  userRow: {
    backgroundColor: "#D27623",
  },
  userText: {
    color: "#fff", // Warna putih untuk teks user
  },
  defaultText: {
    color: "#333", // Warna default
  },
  rankContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Roboto",
    fontWeight: "600",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  medal: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default LeaderboardScreen;
