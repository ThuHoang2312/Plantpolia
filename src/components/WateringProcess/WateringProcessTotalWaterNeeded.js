import PropTypes from 'prop-types';
import {View} from 'react-native';
import React from 'react';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {useAssets} from 'expo-asset';

export const WateringProcessTotalWaterNeeded = ({
  waterAmount,
  generateOutputText,
}) => {
  const [assets] = useAssets([require('../../../assets/WaterDrop.png')]);

  waterAmount = waterAmount ?? 0;

  generateOutputText =
    generateOutputText ??
    ((waterAmount) =>
      `Total of ${waterAmount} ml water is needed to water all the plants.`);

  return (
    <View>
      <RNEListItem bottomDivider style={{marginBottom: 10}}>
        {assets && (
          <Avatar
            rounded
            size="medium"
            source={{
              uri: assets[0].localUri,
            }}
          />
        )}
        <RNEListItem.Content style={{paddingVertical: 30}}>
          <RNEListItem.Title style={{fontSize: 20}}>
            {generateOutputText(waterAmount)}
          </RNEListItem.Title>
        </RNEListItem.Content>
      </RNEListItem>
    </View>
  );
};

WateringProcessTotalWaterNeeded.propTypes = {
  waterAmount: PropTypes.number,
  generateOutputText: PropTypes.func,
};
