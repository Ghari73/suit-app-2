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
import CustomCheckBox from "../../component/customCheckBox";
import { fetchPosts } from "../../api/restApi";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorVerifPassword, setErrorVerifPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [loading, setLoading] = useState("");
  const [errorFetch, setErrorFetch] = useState(null);

  const [fontsLoaded] = useFonts({
    "Lilita One": require("../../assets/fonts/LilitaOneRegular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const validateEmail = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setErrorEmail("Invalid email format");
    } else {
      setErrorEmail("");
    }
  };

  const validateUsername = () => {
    const validUsername = /^[a-zA-Z0-9_]+$/.test(username);
    if (!validUsername) {
      setErrorUsername("Username cannot contain symbols or spaces!");
    } else {
      setErrorUsername("");
    }
  };

  const validatePassword = (text) => {
    if (text.length < 8) {
      setErrorPassword("Password must be at least 8 characters");
    } else {
      setErrorPassword("");
    }
  };

  const validateVerifPassword = (text) => {
    if (text !== password) {
      setErrorVerifPassword("Password confirmation does not match");
    } else {
      setErrorVerifPassword("");
    }
  };

  // const {login: setLoginState} = useAuth();
  const post = async () => {
    let postData = {
      username: username,
      email: email,
      password: password,
    };

    if (!username || !email || !password || !verifPassword) {
      Alert.alert(
        "Validation Error",
        "username, email, and password cannot be empty!"
      );
    } else {
      console.log(postData);
      setLoading(true);
      try {
        const newPost = await fetchPosts(postData);
        Alert.alert("Success");
        navigation.navigate("SignInScreen");
      } catch (error) {
        if (errorEmail !== ''){
          Alert.alert("Please input a valid email");
          return
        } else if(errorPassword !== '' || errorVerifPassword !== ''){
          Alert.alert("Password must be at least 8 characters");
          return
        } else{
          console.log(error)
          setErrorFetch(error.message);
          Alert.alert(error.message);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo_horizontal.png")}
            style={styles.logo}
          />
          <Text style={styles.title2}>Create New{"\n"}Account</Text>
          <Text style={styles.subtitle}>
            Take the first step to your{"\n"}best experience!
          </Text>
        </View>

        <View style={{ width: "100%" }}>
          <Image
            source={require("../../assets/images/rock-paper-scissors1.png")}
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                validateUsername(text);
              }}
            />
            {errorUsername !== "" && (
              <Text style={styles.errorText}>{errorUsername}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
            />
            {errorEmail !== "" && <Text style={styles.errorText}>{errorEmail}</Text>}

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

            <TextInput
              style={styles.input}
              placeholder="Verify Your Password"
              secureTextEntry
              value={verifPassword}
              onChangeText={(text) => {
                setVerifPassword(text);
                validateVerifPassword(text);
              }}
            />
            {errorVerifPassword !== "" && (
              <Text style={styles.errorText}>{errorVerifPassword}</Text>
            )}

            <CustomCheckBox
              label="I have read and agree to the"
              value={isChecked}
              onValueChange={(newValue) => setIsChecked(newValue)}
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isChecked ? "#D27623" : "#ccc" },
              ]}
              disabled={!isChecked}
              onPress={() => post()}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <Text style={styles.buttonText2}>Sign In Here</Text>
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
    marginRight: 30,
    top: -145,
    right: 0,
    zIndex: 0,
  },
  formContainer: {
    display: "flex",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 30,
    height: 530,
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
    alignSelf: "left",
    color: "#266489",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    alignItems: "left",
    marginBottom: 20,
  },
  logo: {
    width: 138,
    height: 40,
    marginBottom: 15,
  },
  title2: {
    fontSize: 48,
    fontFamily: "Lilita One",
    color: "#fff",
  },
  subtitle: {
    marginTop: 15,
    fontSize: 16,
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
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
    marginTop: 5,
  },
  button2: {
    width: "100%",
    borderColor: "#007BFF",
    paddingTop: 5,
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
    alignSelf: "left",
  },
});
