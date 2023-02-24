import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils/colors';
import {fontSizes, spacing} from '../../utils/sizes';

const Welcome = () => {
  const {user} = useContext(MainContext);
  console.log(user);
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
    color: colors.primary800,
    fontSize: fontSizes.lg,
    fontWeight: '500',
  },
});
export default Welcome;
