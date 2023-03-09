import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Text} from '@rneui/themed';
import {IconButton} from 'react-native-paper';
import {useAssets} from 'expo-asset';
import {fontFamily, fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';
import {useMainContext} from '../contexts/MainContext';

/**
 * Success page shown after all the plants are watered.
 * @param {object} props Props of component.
 * @param {object} props.navigation React Navigation.
 * @param {object} props.route Route Information.
 * @return {JSX.Element}
 */
export const FirstPromo = ({navigation}) => {
  const {setPromoStatus} = useMainContext();
  const [assets] = useAssets([require('../../assets/pot-plant.jpg')]);

  return (
    <SafeAreaView style={styles.container}>
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
        <Button
          style={styles.button}
          type="clear"
          onPress={() => {
            setPromoStatus('VIEWED');
            navigation.navigate('ThirdPromo');
          }}
        >
          Skip
        </Button>
        <IconButton
          icon="arrow-right"
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
    backgroundColor: colors.background,
  },
  imageContainer: {
    flex: 6,
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
