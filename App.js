import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/splash_screen/SplashScreen";
import SignInScreen from "./screens/login_screen/login";
import SignUpScreen from "./screens/register_screen/signUp";
import { Authprovider } from "./context/authContext";
import HomeScreen from "./screens/home_screen/HomeScreen";
import GamePlay from "./screens/game_screen/GamePlayScreen";
import LeaderboardScreen from "./screens/leaderboard_screen/leaderboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Authprovider>
      <Route/>
    </Authprovider>
  );
}

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {/* {user ? (
          <> */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaderboardScreen"
          component={LeaderboardScreen}
          options={{ headerShown: false }}
        />
        {/* </>
        ) : (
          <> */}
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="GamePlayScreen"
          component={GamePlay}
          options={{ headerShown: false }}
        />
        {/* </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
