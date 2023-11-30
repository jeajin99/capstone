import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registration } from './Registration';

const RegisterScreen = () => {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailError, setEmailError] = useState('');

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleSignup = async () => {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return;
    } else {
      setEmailError('');
    }

    // Password match validation
    if (!passwordsMatch) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    const success = await registration(nickName, email, password);
    if (success) {
      navigation.navigate('Initial');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (confirmPassword !== '' && text !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (password !== '' && text !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBackButtonContainer}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.goBackButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topLogo}>
        <Text style={styles.logo}>Registration</Text>
      </View>
      <View style={styles.formArea}>
        <TextInput
          style={styles.textForm}
          placeholder={'이메일'}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        {emailError !== '' && (
          <View style={styles.validationMessage}>
            <Text style={styles.TextValidation}>{emailError}</Text>
          </View>
        )}
        <TextInput
          style={styles.textForm}
          secureTextEntry={true}
          placeholder={'비밀번호(8자 이상)'}
          onChangeText={handlePasswordChange}
          value={password}
        />
        <TextInput
          style={styles.textForm}
          secureTextEntry={true}
          placeholder={'비밀번호 확인'}
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
        />
        {!passwordsMatch && (
          <View style={styles.validationMessage}>
            <Text style={styles.TextValidation}>
              비밀번호가 일치하지 않습니다.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.formArea}>
        <TextInput
          style={styles.textForm}
          placeholder={'닉네임'}
          onChangeText={text => setNickName(text)}
        />
        <View style={styles.pickerSelect}>
          {/* RNPickerSelect 컴포넌트 스타일 */}
        </View>
      </View>
      <View style={styles.validationMessage}>
        {/* General validation message goes here */}
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = {
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    goBackButtonContainer: {
      top: 20,
      left: 0,
    },
    goBackButtonText: {
      fontSize: 40,
      fontWeight: 'bold'
    },
    formArea: {
      flex: 3,
    },
    textForm: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      marginVertical: 2,
    },
    validationMessage: {
      flex: 0.5,
      justifyContent: 'center',
    },
    TextValidation: {
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
    },
    buttonArea: {
      flex: 0.75,
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'black',
      height: 50,
      width: 250,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    topLogo: {
      alignItems: 'left',
      marginTop: 20
    },
    logo: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    validationMessage: {
      justifyContent: 'center',
      marginVertical: 5,
    },
    TextValidation: {
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
    },
  };
  
  export default RegisterScreen;