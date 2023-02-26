import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils/colors';
import {fontSizes, spacing} from '../../utils/sizes';

const UserPlantDetail = ({plant, navigation}) => {
  console.log('USER PLANT DETAIL : ', plant.title);
  const plantDescription = JSON.parse(plant.description);
  const {image} = useContext(MainContext);
  console.log(image);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: image}} />
      </View>
      <Text style={styles.title}>{plant.title}</Text>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell style={styles.label}>Other names</DataTable.Cell>
          <DataTable.Cell>{plantDescription.otherNames}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={styles.label}>Level</DataTable.Cell>
          <DataTable.Cell>{plantDescription.level}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={styles.label}>Clean</DataTable.Cell>
          <DataTable.Cell>{plantDescription.clean}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={styles.label}>
            Liquid Fertilizing
          </DataTable.Cell>
          <DataTable.Cell>{plantDescription.liquidFertilizing}</DataTable.Cell>
        </DataTable.Row>

        <Text style={styles.label}>Water Instruction</Text>
        <Text style={styles.text}>{plantDescription.waterInstruction}</Text>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: '70%',
    alignSelf: 'center',
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    top: 7,
    borderRadius: spacing.md,
    borderColor: colors.primary100,
    borderWidth: spacing.sm / 4,
  },
  title: {
    fontSize: fontSizes.lg,
    marginTop: spacing.sm,
    alignSelf: 'center',
    color: colors.primary700,
  },
  label: {
    fontWeight: 'bold',
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  text: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
});

UserPlantDetail.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  plant: PropTypes.object,
};

export default UserPlantDetail;
