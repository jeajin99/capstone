import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signin } from './Signin';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    const success = await signin(email, password);
    if (success) {
      navigation.navigate('Mains');
    } else {
      setFailedAttempts(prevAttempts => prevAttempts + 1);
      if (failedAttempts === 2) {
        // After three failed attempts, trigger the "Forgot Password" feature
        Alert.alert('비밀번호를 3회 이상 틀렸습니다. 비밀번호 찾기 기능을 이용해주세요.');
        // You can add the logic to navigate to the "Forgot Password" screen or any other relevant action
      } else {
        setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
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
        <Text style={styles.logo}>Login</Text>
      </View>
      <View style={styles.formArea}>
        <TextInput
          style={styles.textForm}
          placeholder={'이메일'}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textForm}
          secureTextEntry={true}
          placeholder={'비밀번호(8자 이상)'}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.errorArea}>
        {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
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
    fontWeight: 'bold',
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
    marginTop: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  errorArea: {
    alignItems: 'center',
    marginVertical: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
  },
};

export default LoginScreen;