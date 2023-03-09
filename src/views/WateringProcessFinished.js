import {useWindowDimensions, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Text} from '@rneui/themed';
import {useAssets} from 'expo-asset';
import {useMainContext} from '../contexts/MainContext';

/**
 * Success page shown after all the plants are watered.
 * @param {object} props Props of component.
 * @param {object} props.navigation React Navigation.
 * @param {object} props.route Route Information.
 * @return {JSX.Element}
 */
export const WateringProcessFinished = ({navigation, route}) => {
  const {skippedPlantCount} = route.params;
  const {width} = useWindowDimensions();
  const {setWateringEventListNeedsHydration} = useMainContext();

  const [assets] = useAssets([require('../../assets/happy-face.png')]);
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      {assets && (
        <Image
          source={{uri: assets[0].localUri}}
          style={{
            width: width,
            height: 200,
            resizeMode: 'contain',
            marginTop: 100,
          }}
        />
      )}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        Well done! Your plants are now hydrated
      </Text>
      {skippedPlantCount > 0 && (
        <Text
          style={{
            textAlign: 'center',
            color: 'red',
            paddingHorizontal: 10,
            paddingVertical: 10,
            paddingBottom: 30,
          }}
        >
          You skipped watering {skippedPlantCount}{' '}
          {skippedPlantCount === 1 ? 'plant' : 'plants'}. Do not forget to water{' '}
          {skippedPlantCount === 1 ? 'it' : 'them'} later!
        </Text>
      )}

      <Button
        onPress={() => {
          setWateringEventListNeedsHydration(true);
          navigation.navigate('Home');
        }}
        buttonStyle={{paddingVertical: 40}}
        titleStyle={{
          fontWeight: 'bold',
        }}
      >
        Return to Home Page
      </Button>
    </View>
  );
};

WateringProcessFinished.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
