import PropTypes from 'prop-types';
import {View} from 'react-native';
import React from 'react';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {useAssets} from 'expo-asset';
import {fontFamily} from '../../utils/sizes';

export const WateringProcessInstruction = ({waterInstruction}) => {
  const [assets] = useAssets([require('../../../assets/WaterDrop.png')]);

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
          <RNEListItem.Title style={{fontFamily: fontFamily.regular}}>
            {waterInstruction}
          </RNEListItem.Title>
        </RNEListItem.Content>
      </RNEListItem>
    </View>
  );
};

WateringProcessInstruction.propTypes = {
  waterInstruction: PropTypes.string,
};
