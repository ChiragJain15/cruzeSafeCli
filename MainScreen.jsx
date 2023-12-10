/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ImageBackground, Button} from 'react-native';
import bg from './assets/cruze-safe-logo-bg.jpg';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';

setUpdateIntervalForType(SensorTypes.accelerometer, 2000);

const MainScreen = () => {
  const [riderMode, setRiderMode] = useState(false);
  const [X, setX] = useState('');
  const [Y, setY] = useState('');
  const [Z, setZ] = useState('');
  // useEffect(() => {

  // }, []);
  const subscription = accelerometer
    .pipe(
      map(({x, y, z}) => {
        setX(x);
        setY(y);
        setZ(z);
      }),
    )
    .subscribe();
  // Example: Unsubscribe from sensor data

  const handleSubmitPress = () => {
    setRiderMode(!riderMode);
    console.log(riderMode);
  };
  return (
    <>
      <ImageBackground source={bg} resizeMode="cover" style={styles.container}>
        <Text>Hello world</Text>
        <Button onPress={handleSubmitPress} title="Activate" color="pink" />
        {riderMode && (
          <>
            <Text>x = {X}</Text>
            <Text>y = {Y}</Text>
            <Text>z = {Z}</Text>
          </>
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default MainScreen;
