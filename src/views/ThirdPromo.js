import {
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text} from '@rneui/themed';
import {useAssets} from 'expo-asset';
import {fontFamily, fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';
import Button from '../components/shared/Button';

/**
 * Success page shown after all the plants are watered.
 * @param {object} props Props of component.
 * @param {object} props.navigation React Navigation.
 * @param {object} props.route Route Information.
 * @return {JSX.Element}
 */
export const ThirdPromo = ({navigation}) => {
  const [assets] = useAssets([require('../../assets/fig-plant.jpg')]);

  return (
    <SafeAreaView style={styles.container}>
      {assets && (
        <View style={styles.imageContainer}>
          <Image source={{uri: assets[0].localUri}} style={styles.image} />
        </View>
      )}
      <View style={styles.promoContainer}>
        <Text style={styles.secondPromo}>Keep your</Text>
        <Text style={styles.firstPromo}>
          <Text style={styles.plant}>plants</Text> alives
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Sign In"
          disabled={false}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 800,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flex: 1,
  },
  promoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  firstPromo: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xxl,
    alignSelf: 'center',
  },
  secondPromo: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xxl,
    alignSelf: 'center',
  },
  button: {
    fontFamily: fontFamily.bold,
    alignSelf: 'flex-end',
    marginRight: spacing.md,
    fontSize: fontSizes.md,
    marginVertical: spacing.md,
  },
  plant: {
    color: colors.primary700,
    fontFamily: fontFamily.bold,
  },
});

ThirdPromo.propTypes = {
  navigation: PropTypes.object,
};
