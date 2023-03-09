import React, {useContext, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {Card, Overlay, Button} from '@rneui/themed';
import {uploadUrl} from '../../utils/variables';
import {colors} from '../../utils/colors';
import {fontFamily, spacing} from '../../utils/sizes';
import {IconButton} from 'react-native-paper';
import {useApi} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';

export const PlantPhotoListItem = ({
  imageUrl,
  title,
  description,
  date,
  navigation,
  fileId,
}) => {
  const {deleteMedia} = useApi();
  const {token} = useContext(MainContext);
  // Convert time_add string to date
  date = Date.parse(date);
  let timeAdd = new Date(date);
  timeAdd = timeAdd.toDateString();

  // Delete confirm overlay
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const deleteFile = async () => {
    try {
      const response = await deleteMedia(fileId, token);
      if (response) {
        // console.log('plant delete');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card containerStyle={styles.card}>
        <IconButton
          icon="delete-circle"
          size={22}
          onPress={toggleOverlay}
          style={styles.icon}
          iconColor={colors.primary700}
        />
        <Card.Title style={styles.title}>{title.toUpperCase()}</Card.Title>
        <Card.Image source={{uri: uploadUrl + imageUrl}} style={styles.image} />
        <Card.Title style={styles.text}>{description}</Card.Title>
        <Card.Title style={styles.text}>{timeAdd}</Card.Title>
      </Card>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <Button onPress={deleteFile} color={colors.primary700}>
          Click to confirm you want to delete
        </Button>
        <IconButton
          icon="close"
          size={25}
          onPress={toggleOverlay}
          style={styles.secondIcon}
        />
      </Overlay>
    </>
  );
};

const width = Dimensions.get('window').width - spacing.xxxl;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    width: width / 2,
  },
  icon: {
    position: 'absolute',
    top: -spacing.md,
    right: -spacing.lg,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.primary700,
    fontWeight: 'bold',
    marginVertical: spacing.sm,
  },
  text: {
    fontFamily: fontFamily.bold,
    color: colors.primary700,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  overlay: {
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    height: '10%',
    width: '60%',
  },
  secondIcon: {
    position: 'absolute',
    top: -spacing.md,
    right: -spacing.md,
  },
});

PlantPhotoListItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  fileId: PropTypes.number,
  navigation: PropTypes.object,
};
