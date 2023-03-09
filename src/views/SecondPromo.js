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
export const SecondPromo = ({navigation}) => {
  const [assets] = useAssets([require('../../assets/unsplash.jpg')]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.promoContainer}>
        <Text style={styles.secondPromo}>Grow your</Text>
        <Text style={styles.firstPromo}>
          favorite <Text style={styles.plant}>plants</Text>
        </Text>
      </View>
      {assets && (
        <View style={styles.imageContainer}>
          <Image source={{uri: assets[0].localUri}} style={styles.image} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <IconButton
          icon="arrow-left-bold"
          size={30}
          iconColor={colors.primary800}
          onPress={() => navigation.navigate('FirstPromo')}
        />
        <IconButton
          icon="arrow-right-bold"
          size={30}
          iconColor={colors.primary800}
          onPress={() => navigation.navigate('ThirdPromo')}
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
    backgroundColor: colors.background,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    backgroundColor: colors.background,
  },
  firstPromo: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xxl,
    alignSelf: 'flex-start',
    marginRight: spacing.md,
    marginLeft: spacing.xxxl,
  },
  secondPromo: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xxl,
    alignSelf: 'flex-start',
    marginLeft: spacing.sm,
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

SecondPromo.propTypes = {
  navigation: PropTypes.object,
};
