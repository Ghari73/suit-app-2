import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DataTable } from "react-native-paper";

const Leaderboards = ({ Avatar, fontFamily, navigation, Users, UserId }) => {
  const trophyIcons = {
    1: require("../assets/images/bi_trophy-1.png"),
    2: require("../assets/images/bi_trophy-2.png"),
    3: require("../assets/images/bi_trophy-3.png"),
  };
  console.log(UserId);

  return (
    <View style={styles.leaderBoardContainer}>
      <ScrollView>
        {Users && (
          <DataTable style={{ gap: 10, paddingBottom: 80 }}>
            {Users.map((user, index) => (
              <DataTable.Row key={user.id} style={{ borderBottomWidth: 0 }}>
                <DataTable.Cell
                  style={{ justifyContent: "center", maxWidth: 60 }}
                >
                  {index < 4 ? (
                    <Image
                      source={trophyIcons[index + 1]}
                      style={styles.trophyStyle}
                    ></Image>
                  ) : (
                    <Text
                      style={{
                        fontFamily: fontFamily,
                        fontSize: 24,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ justifyContent: "flex-start", maxWidth: 40 }}
                >
                  <Image
                    source={{ uri: user.User.avatar_url }}
                    style={styles.avatarStyle}
                  ></Image>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingLeft: 15,
                      fontFamily: fontFamily,
                    }}
                  >
                    {user.User.username}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      fontFamily: fontFamily,
                    }}
                  >
                    {user.point}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.myLeaderboard}
        onPress={() => {
          navigation.navigate("LeaderboardScreen");
        }}
      >
        {Users && (
          <DataTable style={{ gap: 10 }}>
            {Users.filter((user) => user.user_id === UserId).map((user) => (
              <DataTable.Row key={user.id} style={{ borderBottomWidth: 0 }}>
                <DataTable.Cell
                  style={{ justifyContent: "flex-start", maxWidth: 60 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 20,
                      fontFamily: fontFamily,
                      textAlign: "center",
                    }}
                  >
                    {user.id}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ justifyContent: "flex-start", maxWidth: 40 }}
                >
                  <Image
                    source={{ uri: user.User.avatar_url }}
                    style={styles.avatarStyle}
                  ></Image>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingLeft: 15,
                      color: "white",
                      fontFamily: fontFamily,
                    }}
                  >
                    {user.User.username}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                      fontFamily: fontFamily,
                    }}
                  >
                    {user.point}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Leaderboards;

const styles = StyleSheet.create({
  leaderBoardContainer: {
    backgroundColor: "white",
    height: 268,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    //marginBottom: -38,
    padding: 20,
    paddingTop: 30,
  },
  avatarStyle: {
    borderRadius: 30,
    height: 42,
    width: 42,
  },
  trophyStyle: {
    height: 42,
    width: 42,
    resizeMode: "contain",
  },
  myLeaderboard: {
    backgroundColor: "#D27623",
    width: "100%",
    position: "absolute",
    alignSelf: "center",
    bottom: 30,
    borderRadius: 10,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
