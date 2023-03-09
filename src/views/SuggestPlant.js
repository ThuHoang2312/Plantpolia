import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Button, Overlay, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import {fontFamily} from '../utils/sizes';

const SuggestPlant = (navigation) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button
        title="Open Overlay"
        onPress={toggleOverlay}
        buttonStyle={styles.button}
        titleStyle={{fontFamily: fontFamily.regular}}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.title}>Suggest plant!</Text>
        <Button text="Save" disabled={false} onPress={toggleOverlay} />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fontFamily.regular,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: fontFamily.regular,
  },
});

SuggestPlant.propTypes = {
  navigation: PropTypes.object,
};

export default SuggestPlant;
