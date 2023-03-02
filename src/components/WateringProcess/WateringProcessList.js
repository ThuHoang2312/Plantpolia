import PropTypes from 'prop-types';
import {View} from 'react-native';
import {WateringProcessListItem} from './WateringProcessListItem';
import React from 'react';
import {Text} from '@rneui/themed';
import {uploadUrl} from '../../utils/variables';

/** @type {import('../../types/TypedComponents').WateringProcessList} */
export const WateringProcessList = ({
  items,
  onMoveUpPress,
  onMoveDownPress,
}) => {
  return (
    <View>
      <Text style={{padding: 10, fontWeight: 'bold'}}>Plant list</Text>

      {(items ?? []).map(({description, title, thumbnails}, index) => (
        <WateringProcessListItem
          key={[description, title, thumbnails, index, Date.now()].join()}
          moveUpEnable={index !== 0}
          moveDownEnable={index !== items.length - 1}
          name={title}
          imageUrl={uploadUrl + thumbnails.w160}
          location={description.location}
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
