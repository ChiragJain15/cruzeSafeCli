/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState, useEffect, createRef} from 'react';
import bg from './assets/cruze-safe-logo-bg.jpg';
import logo from './assets/cruze-safe-logo-final.png';
import im1 from './assets/IntroImages/cash-safe.png';
import im2 from './assets/IntroImages/DND.png';
import im3 from './assets/IntroImages/speed.png';
import im4 from './assets/IntroImages/rider-mode.png';
import auth from '@react-native-firebase/auth';
import AppIntroSlider from 'react-native-app-intro-slider';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ImageBackground,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

const HomePage = ({navigation}) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(user => {
        console.log(user);
        // If server response message same as Data Matched
        if (user) {
          navigation.replace('MainScreen');
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          setErrortext(error.message);
        } else if (error.code === 'auth/user-not-found') {
          setErrortext('No User Found');
        } else {
          setErrortext('Please check your email id or password');
        }
      });
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({item}) => {
    return (
      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={styles.introContainer}>
        <Image style={styles.introImage} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </ImageBackground>
    );
  };

  return (
    <>
      {loading ? (
        <ImageBackground
          source={bg}
          resizeMode="cover"
          style={styles.loadingContainer}>
          <Image style={styles.loadingImage} source={logo} />
          <Text style={styles.loadingTextStyle}>CRUZE SAFE</Text>
        </ImageBackground>
      ) : showRealApp ? (
        <ImageBackground
          source={bg}
          resizeMode="cover"
          style={styles.loadingContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View>
              <KeyboardAvoidingView enabled>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={logo}
                    style={{
                      width: '100%',
                      height: 150,
                      resizeMode: 'contain',
                      margin: 30,
                    }}
                  />
                </View>
                <View style={styles.sectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserEmail => setUserEmail(UserEmail)}
                    placeholder="Enter Email"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.sectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserPassword => setUserPassword(UserPassword)}
                    placeholder="Enter Password"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                </View>
                {errortext !== '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}

                <Button
                  onPress={handleSubmitPress}
                  title="Login"
                  color="pink"
                />
                <Text
                  style={styles.registerTextStyle}
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  New Here ? Register
                </Text>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  introContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 100,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },

  introTextStyle: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
    fontSize: 24,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  loadingTextStyle: {
    textAlign: 'center',
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  loadingImage: {
    height: 250,
    width: 250,
  },
  introImage: {
    height: 250,
    width: 250,
  },
  errorTextStyle: {
    marginVertical: 20,
  },
  registerTextStyle: {
    textAlign: 'center',
    marginTop: 20,
  },
});

const slides = [
  {
    key: 's1',
    text: 'Swiftly sends emergency  notifications to your pre-selected contacts , complete with accurateGPS coordinates.',
    image: im1,
  },
  {
    key: 's2',
    text: '(DND) feature to minimize distractions ensuring that you ride with confidence and peace of mind.',
    image: im2,
  },
  {
    key: 's3',
    text: 'Speed Detection Technology',
    image: im3,
  },
  {
    key: 's4',
    text: ' Automatic Rider Mode Activation as soon as you hit a predetermined speed, enhancing your focus on the ride.',
    image: im4,
  },
];

export default HomePage;
