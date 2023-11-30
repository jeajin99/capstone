import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/firestore';
import { useRoute } from '@react-navigation/native';

const ProductRegist = ({ route, navigation }) => {
  const [productName, setProductName] = useState(route.params.barcodeData.prnm || '');
  const [expiryDate, setExpiryDate] = useState('');
  const [categ, setCate] = useState('');
  const [dateError, setDateError] = useState('');

  const sanitizeProductName = (name) => {
    return name.replace(/\s+/g, '_');
  };

  const handleRegistration = async () => {
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}\d{2}\d{2}$/;
    if (!expiryDate.match(dateRegex)) {
      setDateError('날짜 형식이 올바르지 않습니다. (YYYYMMDD)');
      return;
    }

    // Reset date error when a valid date is entered
    setDateError('');

    const sanitizedProductName = sanitizeProductName(productName);

    try {
      await AsyncStorage.setItem('productName', sanitizedProductName);
      await AsyncStorage.setItem('expiryDate', expiryDate);
    } catch (e) {
      console.error('Error saving data to AsyncStorage:', e);
    }

    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .collection("product")
      .doc("cate")
      .collection(categ)
      .add({
        prname: sanitizedProductName,
        brnum: route.params.barcodeData.data,
        deadline: expiryDate,
        cate: categ,
        image: `P${route.params.barcodeData.data}.jpg`
      });

    setTimeout(() => {
      Alert.alert("등록 성공!");
      navigation.navigate('Mains');
    }, 2000);
  };

  const handleScanAgain = () => {
    navigation.replace('Scanner', { scanned: false });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="제품명"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="유통기한 (예: YYYY-MM-DD)"
        value={expiryDate}
        onChangeText={(text) => setExpiryDate(text)}
      />
      {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="카테고리"
        value={categ}
        onChangeText={(text) => setCate(text)}
      />
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleScanAgain}>
          <Text style={styles.buttonText}>스캔 다시하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    height: 50,
    width: 250,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonArea: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProductRegist;