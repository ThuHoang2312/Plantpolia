import {
  Platform,
  StatusBar,
  useWindowDimensions,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text} from '@rneui/themed';
import {IconButton} from 'react-native-paper';
import {useAssets} from 'expo-asset';
import {fontFamily, fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';

/**
 * Success page shown after all the plants are watered.
 * @param {object} props Props of component.
 * @param {object} props.navigation React Navigation.
 * @param {object} props.route Route Information.
 * @return {JSX.Element}
 */
export const FirstPromo = ({navigation}) => {
  const [assets] = useAssets([require('../../assets/pot-plant.jpg')]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}> Skip</Text>
      </View>
      {assets && (
        <View style={styles.imageContainer}>
          <Image source={{uri: assets[0].localUri}} style={styles.image} />
        </View>
      )}
      <View style={styles.promoContainer}>
        <Text style={styles.firstPromo}>
          <Text style={styles.plant}>Plants</Text> make{' '}
        </Text>
        <Text style={styles.secondPromo}>life better</Text>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="arrow-right-bold"
          size={30}
          iconColor={colors.primary800}
          onPress={() => navigation.navigate('SecondPromo')}
          style={{alignSelf: 'flex-end'}}
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
    flex: 5,
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
    alignSelf: 'flex-end',
    marginRight: spacing.md,
  },
  secondPromo: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xxl,
    alignSelf: 'flex-end',
    marginRight: spacing.xxxl + spacing.xl,
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

FirstPromo.propTypes = {
  navigation: PropTypes.object,
};
