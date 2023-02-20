import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import PropTypes from 'prop-types';
import {View} from 'react-native';

export const WateringProcessListItem = ({
  name,
  imageUrl,
  waterAmount,
  hideUpEnable,
  hideDownEnable,
  moveUpEnable,
  moveDownEnable,
  onMoveUpPress,
  onMoveDownPress,
  hideBottomDivider,
}) => {
  hideBottomDivider = hideBottomDivider ?? false;

  return (
    <View>
      <RNEListItem bottomDivider={!hideBottomDivider}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: imageUrl,
          }}
        />
        <RNEListItem.Content>
          <RNEListItem.Title>{name} </RNEListItem.Title>
          <RNEListItem.Subtitle style={{paddingVertical: 5}}>
            💧{waterAmount}ml
          </RNEListItem.Subtitle>
        </RNEListItem.Content>

        {!hideUpEnable && (
          <RNEListItem.Chevron
            disabled={!moveUpEnable}
            iconProps={{
              name: 'arrow-up',
              color: moveUpEnable ? 'black' : 'rgba(0,0,0,0.3)',
              size: 20,
              style: {paddingHorizontal: 10},
            }}
            disabledStyle={{
              backgroundColor: 'transparent',
            }}
            onPress={onMoveUpPress}
          />
        )}

        {!hideDownEnable && (
          <RNEListItem.Chevron
            disabled={!moveDownEnable}
            iconProps={{
              name: 'arrow-down',
              color: moveDownEnable ? 'black' : 'rgba(0,0,0,0.3)',
              size: 20,
            }}
            disabledStyle={{
              backgroundColor: 'transparent',
            }}
            onPress={onMoveDownPress}
          />
        )}
      </RNEListItem>
    </View>
  );
};

WateringProcessListItem.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  waterAmount: PropTypes.number,
  moveUpEnable: PropTypes.bool,
  moveDownEnable: PropTypes.bool,
  hideBottomDivider: PropTypes.bool,
  hideUpEnable: PropTypes.bool,
  hideDownEnable: PropTypes.bool,
  onMoveUpPress: PropTypes.func,
  onMoveDownPress: PropTypes.func,
};
