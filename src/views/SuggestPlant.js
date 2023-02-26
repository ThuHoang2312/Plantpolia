import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Button, Overlay} from '@rneui/themed';
import {StyleSheet, Text, View} from 'react-native';

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
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
});

SuggestPlant.propTypes = {
  navigation: PropTypes.object,
};

export default SuggestPlant;
