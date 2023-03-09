import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {AirbnbRating} from '@rneui/themed';
import {colors} from '../utils/colors';
import {fontFamily, fontSizes, spacing} from '../utils/sizes';
import {MainContext} from '../contexts/MainContext';
import {useApi} from '../hooks/ApiHooks';
import {fileId} from '../utils/variables';

export const Rating = ({navigation}) => {
  const {token} = useContext(MainContext);
  const {addRating} = useApi();

  // Send rating
  const handleRate = async (number) => {
    try {
      const userRating = await addRating(
        {file_id: fileId, rating: number},
        token
      );
      if (userRating) {
        Alert.alert('Thank you for your feedback', userRating.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'You have already rate our app!', [{text: 'OK'}]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}> Rate our app</Text>

        <AirbnbRating
          defaultRating={0}
          onFinishRating={(number) => {
            handleRate(number);
          }}
        />

        <Text style={styles.subtitle}>
          Your thoughts and insights were incredibly valuable to Plantpolia, and
          we appreciate the time and effort you took to share them with us. Your
          suggestions and ideas will help us to improve the app and make it even
          more useful and user-friendly for all of our users.
        </Text>
        <Text style={styles.subtitle}> &hearts; from Plantpolia</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  contentWrapper: {
    backgroundColor: colors.primary100,
    width: '70%',
    height: '60%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: spacing.md,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.lg,
    textAlign: 'center',
    color: colors.primary700,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.md,
    color: colors.primary800,
    textAlign: 'center',
    lineHeight: spacing.lg,
    paddingVertical: spacing.lg,
  },
});

Rating.propTypes = {
  navigation: PropTypes.object,
};
