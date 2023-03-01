import PropTypes from 'prop-types';
import {View} from 'react-native';
import {WateringProcessListItem} from './WateringProcessListItem';
import React from 'react';
import {Text} from '@rneui/themed';
import {WateringProcessTotalWaterNeeded} from './WateringProcessTotalWaterNeeded';
import {safeIntegerParse} from '../../utils/safeIntegerParse';
import {uploadUrl} from '../../utils/variables';

/** @type {import('../../types/TypedComponents').WateringProcessList} */
export const WateringProcessList = ({
  items,
  onMoveUpPress,
  onMoveDownPress,
}) => {
  const sumWaterAmount = items
    .map((item) => safeIntegerParse(item?.description?.waterAmount ?? 0) ?? 0)
    .reduce((x, y) => x + y, 0);

  return (
    <View>
      <WateringProcessTotalWaterNeeded waterAmount={sumWaterAmount} />

      <Text style={{padding: 10, fontWeight: 'bold'}}>Plant list</Text>

      {(items ?? []).map(({description, title, thumbnails}, index) => (
        <WateringProcessListItem
          key={[description, title, thumbnails, index, Date.now()].join()}
          moveUpEnable={index !== 0}
          moveDownEnable={index !== items.length - 1}
          name={title}
          imageUrl={uploadUrl + thumbnails.w160}
          waterAmount={`${description.waterAmount ?? ''}`}
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
