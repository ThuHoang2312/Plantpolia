import {Text} from '@rneui/themed';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';

const TermsAndConditions = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Text h1 style={styles.title}>
          Terms and Policies
        </Text>
        <Text style={styles.content}>
          Welcome to our watering plant app, which is designed to simplify the
          process of caring for your plants and help them thrive. Before using
          our app, please take a moment to read and understand the following
          terms and conditions:
        </Text>
        <Text style={styles.term}>
          1. The app is intended to assist users in managing their plant
          watering schedule and providing useful plant care advice. However, we
          do not guarantee the accuracy, reliability, or completeness of the
          information provided in the app.
        </Text>
        <Text style={styles.term}>
          2. The app is for personal, non-commercial use only. Users are not
          allowed to modify, distribute, or sell the app or its content without
          our prior written consent.
        </Text>
        <Text style={styles.term}>
          3. Users are solely responsible for the care and maintenance of their
          plants, including following the watering schedule and advice provided
          in the app. We are not responsible for any damage or harm caused to
          plants or property resulting from the use or misuse of the app.
        </Text>
        <Text style={styles.term}>
          4. Users must provide accurate and complete information when setting
          up their profile and adding plants to the app. We reserve the right to
          remove any content that is inaccurate, inappropriate, or violates
          these terms and conditions.
        </Text>
        <Text style={styles.term}>
          5. The app may contain links to third-party websites or resources. We
          are not responsible for the content, accuracy, or reliability of any
          third-party websites or resources and do not endorse any products,
          services, or information provided by such websites or resources.
        </Text>
        <Text style={styles.term}>
          6.We may update these terms and conditions at any time without prior
          notice. By using the app, users agree to be bound by the most current
          version of these terms and conditions.
        </Text>
        <Text style={styles.content}>
          By using our watering plant app, you acknowledge that you have read,
          understood, and agree to these terms and conditions.
        </Text>
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
    paddingHorizontal: 20,
  },
  title: {
    color: colors.primary600,
    marginVertical: 10,
    textAlign: 'center',
  },
  content: {
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 30,
    color: colors.primary800,
  },
  term: {
    marginLeft: 20,
    fontSize: 20,
    marginBottom: 15,
    lineHeight: 25,
    color: colors.primary800,
  },
});

export default TermsAndConditions;
