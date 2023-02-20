import PropTypes from 'prop-types';
import {View} from 'react-native';
import {WateringProcessListItem} from './WateringProcessListItem';
import React from 'react';
import {Text} from '@rneui/themed';
import {WateringProcessTotalWaterNeeded} from './WateringProcessTotalWaterNeeded';

export const WateringProcessList = ({
  items,
  onMoveUpPress,
  onMoveDownPress,
}) => {
  const sumWaterAmount = items
    .map((item) => item.waterAmount)
    .reduce((x, y) => x + y, 0);

  return (
    <View>
      <WateringProcessTotalWaterNeeded waterAmount={sumWaterAmount} />

      <Text style={{padding: 10, fontWeight: 'bold'}}>Plant list</Text>

      {(items ?? []).map(({url, waterAmount, name}, index) => (
        <WateringProcessListItem
          key={[url, waterAmount, name, index, Date.now()].join()}
          moveUpEnable={index !== 0}
          moveDownEnable={index !== items.length - 1}
          name={name}
          imageUrl={url}
          waterAmount={waterAmount}
          onMoveUpPress={() => onMoveUpPress(index)}
          onMoveDownPress={() => onMoveDownPress(index)}
        />
      ))}
    </View>
  );
};

WateringProcessList.propTypes = {
  items: PropTypes.array,
  onMoveUpPress: PropTypes.func,
  onMoveDownPress: PropTypes.func,
};
