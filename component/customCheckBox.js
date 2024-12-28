import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalComp from './modal';

export default function CustomCheckBox({ label, onValueChange, value, navigation }) {
  const [isChecked, setIsChecked] = useState(value || false);
  const [modalVisible, setModalVisible] = useState(false)

  const toggleCheckbox = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onValueChange) {
      onValueChange(newValue); // Mengirimkan status checkbox ke parent
    }
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container} activeOpacity={0.7}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && (
          <Ionicons name="checkmark" size={16} color="white" />
        )}
      </View>
      <View style={{marginLeft: 10}}>
       {label && <Text style={styles.label}>{label}</Text>}
        <Text style={styles.linkText} onPress={() => setModalVisible('TermsCon')} >Terms of Use and Privacy Policy *</Text>
      </View>
      <ModalComp modalState= {[modalVisible, setModalVisible]}/>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007B7F',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checked: {
    backgroundColor: '#007B7F',
    borderColor: '#007B7F',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    color: '#008080',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});