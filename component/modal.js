import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Button, View, SafeAreaView, Pressable, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

export default function ModalComp({modalState = useState('')}) {
  const [activeModal, setActiveModal] = modalState;
  const [fontsLoaded] = useFonts({
         'Lilita One': require("../assets/fonts/LilitaOneRegular.ttf")
     });
 
     if (!fontsLoaded) {
         return <Text>Loading fonts...</Text>;
       }
  return (
    <SafeAreaView style={styles.centeredView}>
      {/*cara manggilnya, activeModalnya diset di screen pemanggil. Ex: customCheckBox line 27 */}
        <TermsCon
          visible={activeModal === "TermsCon"}
          onClose={() => setActiveModal("")}
        />

        <QuitAlertModal
        visible={activeModal === "Quit"}
        onClose={() => setActiveModal("")}
        />
        
        <InvalidRoomModal
        visible={activeModal === "InvalidRoom"}
        onClose={() => setActiveModal("")}
        />
        
        <RoomCreatedModal
        visible={activeModal === "RoomCreated"}
        onClose={() => setActiveModal}
        />

        <MultiPlayerModal
        visible={activeModal === "MultiPlayer"}
        onClose={() => setActiveModal}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 5,
    backgroundColor: '#ffffff',
    padding:20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "70%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
    color: '#2395d2',
    fontFamily: 'Lilita One'
  },
  titleMultiPlayer: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
    color: '#D27623',
    fontFamily: 'Lilita One'
  },
  titleRoomCode: {
    fontSize: 24,
    textAlign: 'center',
    color: '#2395d2',
    fontFamily: 'Lilita One'
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: '#2395d2',
    fontFamily: 'Lilita One'
  },
  buttonYes: {
    backgroundColor: "#D27623",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "40%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: 'Lilita One',
  },
  buttonMultiPlayer: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 25,
    width: "80%",
    marginVertical: 10,
    alignItems: "center",
    width: 70
  },
  inputModal: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    width: "70%",
    marginVertical: 10,
    textAlign: 'left',
    fontFamily: 'Lilita One'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Lilita One'
  },
  profileOptions: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  profileItem: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  profileText: {
    fontSize: 20,
  },
  closeButton: {
    color: "red",
    marginTop: 10,
  },
  warningIcon: {
    fontSize: 40,
    color: "orange",
    marginBottom: 10,
  },
  titleCreateRoom: {
    fontSize: 24,
    color: '#D27623',
    fontFamily: 'Lilita One'
  },
  warningText: {
    fontSize: 16,
    textAlign: "center",
    color: "#D27623",
    fontFamily: 'Lilita One'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  roomCode: {
    fontSize: 32,
    fontFamily: 'Lilita One',

    color: "#D27623",
    marginVertical: 10,
  },
});

const TermsCon =({ visible, onClose }) => {
  return (
    <>
    <Modal      
        onRequestClose={onClose} //perintah menutup modal
        visible={visible} // mengatur modal muncul
        presentationStyle='pageSheet' // untuk mengatur tampilan modal (untuk ios aza)
        animationType="fade" // untuk mengatur animasi modal
        >
        <View style={styles.header}>
            <View style={{ flexDirection:'row', alignItems: 'center' }}>
                <Ionicons name= 'close-circle' size={28} color='black' onPress={onClose}></Ionicons>
                <Text style={{fontSize: 28, marginLeft:10, fontFamily: 'Lilita One'}}>Terms and Privacy Policy</Text>
            </View> 
        </View>
        <ScrollView style={{padding: 40}}>
          <Text style={{marginBottom: 10, fontSize: 24, fontFamily: 'Lilita One'}}>Terms and Condition</Text>

          <Text style={{marginBottom: 30, fontSize: 16, textAlign:'justify'}}>
            By using SUWLIT, you agree to be bound by these Terms of Service and any 
            additional terms, policies, or guidelines incorporated by reference. 
            If you do not agree to these terms, do not use the App. To access 
            certain features of the App, you may need to create an account and 
            provide accurate, current, and complete information during registration. 
            You are responsible for maintaining the confidentiality of your 
            account details and for all activities that occur under your account. 
            You agree not to use the App for illegal, harmful, or unauthorized 
            activities and to refrain from violating any intellectual property 
            rights or disrupting the App’s functionality. Your use of the App 
            is governed by our Privacy Policy, which outlines how we collect, 
            use, and protect your personal information. We may update these Terms 
            of Service at any time, and any changes will be posted on the App. 

            By continuing to use the App after such updates, you agree to the 
            modified terms. We reserve the right to suspend or terminate your 
            account if you violate these Terms or engage in inappropriate behavior. 
            The App is provided "as is," and we make no warranties regarding its 
            functionality or performance. We are not liable for any damages arising 
            from your use of the App. 
          </Text>

          <Text style={{marginBottom: 10, fontSize: 24, fontFamily: 'Lilita One'}}>Privacy Policy</Text>
          <Text style={{marginBottom: 50, fontSize: 16, textAlign: 'justify'}}>
            At SUWLIT, we are committed to protecting your privacy. We collect 
            personal information, such as your name and email address, when 
            you create an account or interact with the App. We also collect 
            usage data, including information about your device, IP address, 
            and how you use the App. This information is used to provide, 
            maintain, and improve the App's functionality, communicate with you 
            about updates or promotions, and analyze user trends. We will 
            not share your personal information with third parties except when 
            required by law or in cases where we use trusted service providers 
            to operate the App, such as payment processors or hosting providers. 
            We take reasonable steps to protect your data, but no method 
            of transmission over the internet is completely secure, and we 
            cannot guarantee absolute protection. You have the right to access, 
            update, or delete your personal information at any time, subject
              to certain legal exceptions. You can also opt out of promotional 
              communications by following the instructions in the emails 
              you receive. The App may use cookies to enhance your experience, 
              and you can control your cookie preferences through your device 
              settings. We may update this Privacy Policy from time to time, 
              and any changes will be posted in the App. 
          </Text>
         </ScrollView>
        </Modal>
    
    </>
  )
}

const MultiPlayerModal = ({ visible, onClose, roomNumber, setRoomNumber }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      <View style={{ flexDirection:'row', alignSelf: 'left'}}>
        <Ionicons style= {{marginRight: 10}} name= 'close-circle' size={28} color='#D27623' onPress={onClose}></Ionicons>
        <Text style={styles.titleMultiPlayer}>Multi Player</Text>
      </View> 
        <View style={{width: '100%', marginVertical: 10}}>
          <Text style= {styles.titleCreateRoom}>Create Room</Text>
          <View style= {styles.row}>
            <TextInput
                placeholder="Enter Code"
                style={styles.inputModal}
              />
              <TouchableOpacity style={styles.buttonMultiPlayer}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
          </View>
        </View>

        <View style={{width: '100%', marginVertical: 10}}>
          <Text style= {styles.titleCreateRoom}>Join Room</Text>
          <View style= {styles.row}>
            <TextInput
                placeholder="Enter Code"
                style={styles.inputModal}
                value={roomNumber}
                onChangeText={setRoomNumber}
              />
              <TouchableOpacity style={styles.buttonMultiPlayer}>
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

// Modal untuk Quit Alert
const QuitAlertModal = ({ visible, onClose }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Are You Sure You Want to Quit?</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonYes}>
            <Text style={styles.buttonText}>Yes, Quit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>No, Stay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const InvalidRoomModal = ({ visible, onClose }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Ionicons name='alert-circle-outline' color='#D27623' size={80} marginBottom={10}></Ionicons>
        <Text style={styles.warningText}>
          Invalid room number. Please check and re-enter.
        </Text>
      </View>
    </View>
  </Modal>
);

const RoomCreatedModal = ({ visible, onClose }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.titleRoomCode}>Room Created!</Text>
        <Text style={styles.subtitle}>
          Invite your friend using this code
        </Text>
        <Text style={styles.roomCode}>1435</Text>
      </View>
    </View>
  </Modal>
);