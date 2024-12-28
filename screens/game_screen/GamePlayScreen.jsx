//note
// jika game selsai gada pemberitahuan
//user bisa memilih move ketika countdown blm selsai

import React, { useEffect, useState, useRef} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Easing,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import socket from "../../api/socket";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Rock from "../../assets/images/rock.png";
import Paper from "../../assets/images/paper.png";
import Scissor from "../../assets/images/scissor.png";
import Background from "../../assets/images/background.png";
import LeftPaper from "../../assets/images/HUMANpaper.png";
import LeftRock from "../../assets/images/HUMANrock.png";
import LeftScissor from "../../assets/images/HUMANscissors.png";
import RightPaper from "../../assets/images/AIpaper.png";
import RightRock from "../../assets/images/AIrock.png";
import RightScissor from "../../assets/images/AIscissors.png";
import Draw from "../../assets/images/Draw.png";
import Win from "../../assets/images/Win.png";
import Lose from "../../assets/images/Lose.png";
import { Audio } from 'expo-av';

import Header from "../../components/Header";
import * as Font from "expo-font";
import WaitingModal from "../../components/WaitingModal";
import SuitAction from "../../utils/SuitAction";
import GameResultModal from "../../components/GameResultModal";
import { updateUserResult } from "../../api/restApi";
import { useAuth } from "../../context/authContext";

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");
const bgSound = require('../../assets/sounds/gameplay.mp3')

const GamePlay = ({navigation}) => {
  const route = useRoute();
  const { getUserId } = useAuth();


  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fontFamily = "LilitaOne";
  const [isOpponentReady, setOpponentReady] = useState(false);
  const { data } = route.params; // Room ID passed from Home screen
  const [connected, setConnected] = useState(false);
  const [move, setMove] = useState(null);
  const [myAction, setMyAction] = useState(null);
  const [opponentAction, setOpponentAction] = useState(null);
  const [timer, setTimer] = useState(0);
  const [roundResult, setRoundResult] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [scores, setScores] = useState({});
  const [rounds, setRounds] = useState(0);
  const soundRef = useRef(null); 

  const buttonColors = {
    rock: "rgba(186, 26, 26, 0.8)",
    paper: "rgba(210, 118, 35, 0.8)",
    scissor: "rgba(49, 194, 0, 0.8)",
};

    const isAnimationActive = useRef(true);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;
    const choices = [SuitAction.Paper,SuitAction.Rock,SuitAction.Scissor]
    let idUser = null
    const [isPlayingSound, setIsPlayingSound] = useState(false);

    const fetchUserId = async() => {
      let id = await getUserId()
      idUser = id
    }

    

    async function playSound() {
      if (!isPlayingSound) {
        console.log("playsound");
        const { sound } = await Audio.Sound.createAsync(bgSound);
        soundRef.current = sound;
        await sound.playAsync(); 
        setIsPlayingSound(true)   
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync();
            soundRef.current = null;
            setIsPlayingSound(false);  // Reset state when sound finishes
          }
        });
      }
    }

  async function stopSound() {
    if (soundRef.current) {
      console.log("Stopping sound...");
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlayingSound(false);  // Reset state when sound finishes
        console.log("Sound stopped and unloaded successfully.");
      } catch (error) {
        console.error("Error stopping or unloading sound:", error);
      }
    }
  }


    const runParallelAnimation = () => {
      Animated.parallel([
          Animated.timing(animatedValue, {
              toValue: - (screenHeight/2),
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
          }),
          Animated.timing(animatedValue2, {
            toValue: (screenHeight * (4/10)),
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
      ]).start(() => {
        console.log("animation done")
      });
  };

  const hideParallelAnimation = (myMove,opponentMove,scores) => {
    Animated.parallel([
        Animated.timing(animatedValue, {
            toValue:  (screenHeight/2),
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
        Animated.timing(animatedValue2, {
          toValue:  - (screenHeight * (4/10)),
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
    ]).start(() => {
        setMyAction(myMove)
        setOpponentAction(opponentMove)
        ShowParallelAnimation(scores)
    });
};

const ShowParallelAnimation = (scores) => {
  Animated.parallel([
      Animated.timing(animatedValue, {
          toValue:  -(screenHeight/2),
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue:   (screenHeight * (4/10)),
        duration: 750,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
  ]).start(() => {
        setScores(scores);
        socket.emit("finished-animation", {roomId: data});
  });
};

  const handleStartAnimations = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    runParallelAnimation();
};
    
    useEffect(() => {
        handleStartAnimations();
        isAnimationActive.current = false;
        playSound()
        fetchUserId()
    }, []);
    
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      console.log("Connected to server");
    });

    if (data) {
      setConnected(true);
    }

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from server");
    });

    socket.on("start-game", (message) => {
      console.log(message);
      setMove(null);
      setOpponentAction(null);
      setRoundResult(null);
      setGameResult(null);
      setRounds(0);
      setScores({});
      setOpponentReady(true)
    });

    socket.on(
      "round-result",
      ({ roundResult, playersMove, winnerSocketId, scores, rounds}) => {
        setRoundResult(roundResult);
        setTimer(0);
        setRounds(rounds);
        let opponentMove = null;
        let myMove = playersMove[socket.id]
        for (let key in playersMove) {
            if (key !== socket.id) {
                opponentMove = playersMove[key];
                break;
            }
        }
        hideParallelAnimation(myMove,opponentMove,scores)
        setMove(null);
        const isOpponentWinner = winnerSocketId && winnerSocketId !== socket.id;
      }
    );



    socket.on("game-result", ({ gameResult, winnerSocketId, scores }) => {
      let matchRes = null
      if(gameResult == socket.id) {
        setGameResult("Win");
        matchRes = "win"
      } else if(gameResult == "draw") {
        setGameResult("Draw")
        matchRes = "draw"
      } else {
        setGameResult("Lose")
        matchRes  = "lose"
      }
      const result = {
        "result" : matchRes
      }
      updateUserResult(idUser,result)
      socket.emit("deleteRoom",({}))
      setScores(scores);
      setTimer(0);
    });

    return () => {
      // socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("start-round", ({ roundDuration }) => {
      console.log("start-round")
      setTimer(roundDuration);
      setMove(null);
      setRoundResult(null);
    });

    return () => {
      socket.off("start-round");
    };
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1500);

      return () => {
        clearInterval(interval);
        if(timer === 1) {
          let randomizedChoice = Math.floor(Math.random() * 3);
          makeMove(choices[randomizedChoice])
        }
      }
    }
  }, [timer]);

  const makeMove = (move) => {
    if (data) {
      setMove(move);
      socket.emit("player-move", { roomId: data, move });
    }
  };

  useEffect(() => {
    Font.loadAsync({
      LilitaOne: require("../../assets/fonts/LilitaOneRegular.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ImageBackground style={styles.background} source={Background}>
        <WaitingModal
          visible={!isOpponentReady}
          fontFamily={fontFamily}
          data={data}
        />
        <GameResultModal
            visible={gameResult != null}
            fontFamily={fontFamily}
            data={gameResult}
            navigation={navigation}
            onClose={stopSound}
        />
        <SafeAreaView>
          <Header fontFamily={fontFamily} />
          <View style={styles.scoreContainer}>
            <View
              style={{
                marginLeft: 50,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={[styles.titleScore, { fontFamily: fontFamily }]}>
                Your Score
              </Text>
              <Text style={[styles.score, { fontFamily: fontFamily }]}>
                {scores[socket.id] || 0}
              </Text>
            </View>
            <View
              style={{
                marginRight: 50,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={[styles.titleScore, { fontFamily: fontFamily }]}>
                Opponent's
              </Text>
              <Text style={[styles.score, { fontFamily: fontFamily }]}>
                {Object.keys(scores)
                  .filter((id) => id !== socket.id)
                  .map((id) => scores[id] || 0)}
              </Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            {timer > 0 && (
              <Text style={[styles.timer, { fontFamily: fontFamily }]}>
                {timer}
              </Text>
            )}
          </View>
          <View style={{ height: screenHeight }}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => makeMove(SuitAction.Rock)}
                disabled={!!move}
                style={[
                  styles.button,
                  styles.buttonLeft,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor : buttonColors.rock
                  },
                ]}
              >
                <FontAwesome name="hand-rock-o" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => makeMove(SuitAction.Paper)}
                disabled={!!move}
                style={[
                  styles.button,
                  styles.buttonCenter,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor : buttonColors.paper
                  },
                ]}
              >
                <FontAwesome name="hand-paper-o" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => makeMove(SuitAction.Scissor)}
                disabled={!!move}
                style={[
                  styles.button,
                  styles.buttonRight,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor : buttonColors.scissor
                  },
                ]}
              >
                <FontAwesome name="hand-scissors-o" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.playerHandContainer}>
              <Animated.View style={[{ transform: [{ translateY: animatedValue }]}]}>
                  <SuitImage suitAction={myAction} isOpponent={false}></SuitImage>
              </Animated.View>
              <Animated.View style={[{ transform: [{ translateY: animatedValue2 }]}]}>
                  <SuitImage suitAction={opponentAction} isOpponent={true}></SuitImage>
              </Animated.View>
              
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const SuitImage = ({ suitAction,isOpponent }) => {
  const suitImages = {
      [SuitAction.Paper]: LeftPaper,
      [SuitAction.Scissor]: LeftScissor,
      [SuitAction.Rock]: LeftRock,
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  if(isOpponent) {
    return (
      <Image
      source={suitImages[suitAction] || LeftRock}
      style={{
        transform: [{ rotate: "150deg" }],
        position: "relative",
        bottom: (windowHeight * (7/10)),
        left: -windowWidth * (6/10),
        height: 425,
        width: 300,
        resizeMode: "contain",
        zIndex: 0,
      }}
    />
    );
  } else {
      return (
        <Image
          source={suitImages[suitAction] || LeftRock}
          style={{
            position: "relative",
            left: windowWidth * (4/10),
            bottom: - (windowHeight * (8/10)),
            height: 425,
            width: 500,
            resizeMode: "contain",
            zIndex: 0,
          }}
        />
      );
  }
};

const styles = StyleSheet.create({
  animatedContainer: {
    backgroundColor: 'black',
    width: 200,
    height: 400,
  },
  scoreContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  titleScore: { fontWeight: "bold", fontSize: 24 },
  timerContainer: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    width: "100%",

    top: 200,
    zIndex: 1,
  },
  timer: {
    color: "#D27623",
    fontSize: 100,
    fontWeight: "bold",
  },

  score: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
  },
  playerHandContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  handContainer: {
    flex: 1,
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight,
  },
  hand: {
    position: "absolute",
    width: 200,
    height: 200,
    objectFit: "contain",
    zIndex: 1,
  },
  background: {
    flexDirection: "column",
    resizeMode: "cover",
    height: screenHeight,
    // flex: 1,
    width: screenWidth,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth,
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 200,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    width: 90,
    height: 90,
    // backgroundColor: "#FFFFFF",
    borderRadius: 60,
  },
  buttonLeft: {
    alignSelf: "flex-end",
  },
  buttonCenter: {
    alignSelf: "center",
    marginBottom: 40,
  },
  buttonRight: {
    alignSelf: "flex-end",
  },
});

export default GamePlay;
