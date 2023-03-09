import {Text} from '@rneui/themed';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';
import {fontFamily} from '../utils/sizes';
const AboutPlantpolia = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Text h1 style={styles.title}>
          About Plantpolia
        </Text>
        <Text style={styles.text}>
          Welcome to Plantpolia, where you can easily manage your plant watering
          schedule and never forget to water your plants again! Plantpolia is
          designed to simplify the process of caring for your plants and help
          them thrive. With our app, you can set reminders for watering, track
          the watering history of each plant, and receive useful tips and advice
          for plant care. Whether you are a beginner or an experienced gardener,
          this app is the perfect tool to help you keep your plants healthy and
          beautiful.
        </Text>
        <Text style={styles.text}>Plantpolia is created by:</Text>
        <Text style={styles.text}>- Chi Nguyen</Text>
        <Text style={styles.text}>- Mohammad Askari</Text>
        <Text style={styles.text}>- Thu Hoang</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 0,
    marginVertical: 0,
    paddingBottom: 30,
  },
  title: {
    color: colors.primary600,
    fontSize: 25,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
  text: {
    color: colors.primary800,
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    fontFamily: fontFamily.regular,
    lineHeight: 25,
  },
  logoutButton: {
    backgroundColor: '#000000',
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    fontFamily: fontFamily.regular,
    padding: 20,
  },
  listItem: {
    width: '100%',
    padding: 20,
  },
});

export default AboutPlantpolia;
