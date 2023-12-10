/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
// Import React and necessary components
/* eslint-disable react-native/no-inline-styles */
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import bg from './assets/cruze-safe-logo-bg.jpg';

// Define the RegisterScreen component
const RegisterScreen = ({navigation}) => {
  // State variables
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  // Refs for TextInput components
  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  // Function to handle registration
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      return alert('Please fill Name');
    }
    if (!userEmail) {
      return alert('Please fill Email');
    }
    if (!userPassword) {
      return alert('Please fill Password');
    }

    // Firebase registration
    auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(user => {
        console.log('Registration Successful. Please Login to proceed');
        console.log(user);
        if (user) {
          // Update user profile
          auth()
            .currentUser.updateProfile({
              displayName: userName,
              photoURL: 'https://aboutreact.com/profile.png',
            })
            .then(() => navigation.replace('MainScreen'))
            .catch(error => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setErrortext('That email address is already in use!');
        } else {
          setErrortext(error.message);
        }
      });
  };

  // Render the component
  return (
    <ImageBackground source={bg} resizeMode="cover" style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./assets/cruze-safe-logo-final.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          {/* Name TextInput */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          {/* Email TextInput */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          {/* Password TextInput */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          {/* Display error message if exists */}
          {errortext !== '' && (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          )}

          {/* Register Button */}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  footerText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
});

// Export the component
export default RegisterScreen;
