import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { fetchLogin } from "../../api/restApi";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");
  const [errorFetch, setErrorFetch] = useState("");
  const { login } = useAuth();

  //  const auth = useAuth();
  //apakah useAuth ngebalikin value yang dikasih
  const [loading, setLoading] = useState("");

  const [fontsLoaded] = useFonts({
    "Lilita One": require("../../assets/fonts/LilitaOneRegular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const validateEmail = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setError("Please input a valid email!");
    } else {
      setError("");
    }
  };

  const validatePassword = (text) => {
    if (text.length < 8) {
      setErrorPassword("Password is less than 8");
    } else {
      setErrorPassword("");
    }
  };

  const signIn = async () => {
    let postData = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      Alert.alert("Validation Error", "email, and password cannot be empty!");
      return
    } else {
      // console.log(postData);
      setLoading(true);
    }
    // console.log("hai");
    try {
      const newPost = await fetchLogin(postData);

      const response = login(newPost.data.access_token, newPost.data.user.id);
      console.log("Ini response login ", response);
      Alert.alert("Success");
      navigation.navigate("HomeScreen");
    } catch (error) {
      setErrorFetch(error);
      Alert.alert("Incorrect email or password");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.titleTop}>SUWLIT</Text>

        <View style={{ width: "100%" }}>
          <Image
            source={require("../../assets/images/rock-paper-scissors1.png")}
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
            />
            {error !== "" && <Text style={styles.errorText}>{error}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                validatePassword(text);
              }}
            />
            {errorPassword !== "" && (
              <Text style={styles.errorText}>{errorPassword}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={() => signIn()}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.buttonText2}>Create a New Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: 150,
    height: 150,
    marginLeft: 30,
    top: -145,
    left: 0,
    zIndex: 0,
  },
  formContainer: {
    display: "flex",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 40,
    height: 420,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontFamily: "Lilita One",
    fontSize: 36,
    marginBottom: 20,
    alignSelf: "flex-start",
    color: "#D27623",
  },
  titleTop: {
    position: "relative",
    fontFamily: "Lilita One",
    fontSize: 50,
    marginBottom: 250,
    color: "#ffffff",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 10,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#D27623",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    height: 60,
    marginBottom: 15,
    marginTop: 15,
  },
  button2: {
    width: "100%",
    borderColor: "#007BFF",
    // borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    height: 60,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  buttonText2: {
    color: "#D27623",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  registerText: {
    color: "#007BFF",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
    fontStyle: "italic",
    alignSelf: "flex-start",
  },
});
