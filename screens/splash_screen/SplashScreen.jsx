
    import { StyleSheet, Text, View,Image,Dimensions,ImageBackground,Button } from 'react-native';
    import { StatusBar } from 'expo-status-bar';
    import { useEffect, useState } from "react";
    import { Audio } from 'expo-av';
    import { useAuth } from "../../context/authContext";

    const logo = require("../../assets/images/logo_with_title.png");
    const backgroundImage = require("../../assets/images/background.png");
    const startupSound = require('../../assets/sounds/startup.mp3')
    
    export default function SplashScreen({navigation}) {
        const { isLogin } = useAuth();
       
        async function playSound() {
            let hasToken = await isLogin()
            const { sound } = await Audio.Sound.createAsync(startupSound);
            await sound.playAsync();            
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync();
                    if(hasToken) {
                        navigation.navigate('HomeScreen')
                    } else {
                        navigation.navigate('SignInScreen')
                    }
                }
            });
        }

        useEffect(() => {
           playSound()
        }, []);

        return (
        <View style = {styles.container}>
            <ImageBackground 
                style = {styles.imageBackground}
                source={backgroundImage}
                resizeMode="stretch">
                 <Image source={logo} style={styles.logo} ></Image>
                 
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        logo: {
            height: 250,
            width: 250,
            resizeMode: "contain"
        },
        imageBackground: {
            flex: 1,
            resizeMode: "cover",
            width: '100%',
            height: '100%',
            alignItems: "center",
            justifyContent: "center",
        },
    });
    