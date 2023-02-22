import {useWindowDimensions, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Text} from '@rneui/themed';
import {useAssets} from 'expo-asset';
import {fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';

/**
 * Success page shown after the plant were added successfully
 * @param {object} props Props of component.
 * @param {object} props.navigation React Navigation.
 * @param {object} props.route Route Information.
 * @return {JSX.Element}
 */
export const UploadCompleted = ({navigation, route}) => {
  const {width} = useWindowDimensions();

  const [assets] = useAssets([require('../../assets/loved-face.png')]);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: colors.background,
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
          color: colors.primary700,
          fontSize: fontSizes.lg,
          fontWeight: 'bold',
          textAlign: 'center',
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.sm,
        }}
      >
        Added Succesfully
      </Text>
      <Button
        onPress={() => {
          navigation.navigate('Home');
        }}
        buttonStyle={{paddingVertical: spacing.xxl}}
        color={colors.primary700}
        titleStyle={{
          fontWeight: 'bold',
          color: colors.primary50,
        }}
      >
        Return to Home Page
      </Button>
    </View>
  );
};

UploadCompleted.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
