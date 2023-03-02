import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils/colors';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';

const Welcome = () => {
  const {user} = useContext(MainContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back {user.full_name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fontFamily.regular,
    color: colors.primary800,
    fontSize: fontSizes.lg,
  },
});
export default Welcome;
