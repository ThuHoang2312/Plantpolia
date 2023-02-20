import {useWindowDimensions, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Text} from '@rneui/themed';
import {useAssets} from 'expo-asset';

/**
 * Success page shown after all the plants are watered.
 * @param {object} props Props of component.
 * @param {object} props.navigation React Navigation.
 * @param {object} props.route Route Information.
 * @return {JSX.Element}
 */
export const WateringProcessFinished = ({navigation, route}) => {
  const {width} = useWindowDimensions();

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
          paddingVertical: 30,
          paddingHorizontal: 10,
        }}
      >
        Well done! All the plants are watered now
      </Text>
      <Button
        onPress={() => {
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
