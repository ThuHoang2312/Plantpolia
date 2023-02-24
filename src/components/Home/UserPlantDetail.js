import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import {uploadUrl} from '../../utils/variables';
import {MainContext} from '../../contexts/MainContext';
import {fontSizes, spacing} from '../../utils/sizes';
import PropertyDisplay from '../shared/PropertyDisplay';
import {colors} from '../../utils/colors';

const UserPlantDetail = (plant) => {
  const userPlant = plant.plant;
  // console.log('USER PLANT DETAIL : ', userPlant);
  const plantDescription = JSON.parse(userPlant.description);
  const {image} = useContext(MainContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>{userPlant.title}</Text>
        <Card>
          <Image source={{uri: image}} />
        </Card>
      </View>
      {/* <Card
        style={styles.container}
        contentStyle={styles.contentContainer}
        mode="contained"
      >
        <Card.Content contentStyle={styles.header}>
          <Text variant="titleLarge" style={styles.header}>
            {userPlant.title}
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            {plantDescription.otherNames}
          </Text>
        </Card.Content>
        <Card.Cover source={{uri: image}} />
        <Card.Content style={styles.contentContainer}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell style={styles.label}>Level</DataTable.Cell>
              <DataTable.Cell style={styles.text}>
                {plantDescription.level}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.label}>
                Liquid Fertilizing
              </DataTable.Cell>
              <DataTable.Cell style={styles.text}>
                {plantDescription.liquidFertilizing}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.label}>Clean</DataTable.Cell>
              <DataTable.Cell style={styles.text}>
                {plantDescription.clean}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <PropertyDisplay
            label="Water Instruction"
            content={plantDescription.waterInstruction}
          />
        </Card.Content>
        <Card.Actions>
          <Button>I watered this plant</Button>
        </Card.Actions>
      </Card> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    color: colors.primary800,
  },
  contentContainer: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    color: colors.primary800,
    marginVertical: spacing.md,
  },
});

export default UserPlantDetail;
