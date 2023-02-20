import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {WateringProcessTotalWaterNeeded} from '../components/WateringProcess/WateringProcessTotalWaterNeeded';
import {WateringProcessListItem} from '../components/WateringProcess/WateringProcessListItem';
import {Button, Icon, Text} from '@rneui/themed';

/**
 * Here we get an array of plants from route.params
 *  and user will go through each one and press water or skip and based on that we will send API call.
 *  after list is done we navigate user to {@link WateringProcessFinished}
 * @param {object} props Props of component.
 * @param {object} props.navigation React Navigation.
 * @param {object} props.route Route Information.
 * @return {JSX.Element}
 */
export const WateringProcessStarted = ({navigation, route}) => {
  const [plantIndex, setPlantIndex] = useState(0);
  // data is array
  const {data} = route.params;

  //  Output text based on waterAmount
  const generateOutputText = useCallback((waterAmount) => {
    return `Total of ${waterAmount} ml water is needed to water the rest of the plants.`;
  }, []);

  const generateRemainingText = useCallback((currentPlantIndex, totalCount) => {
    return `Go ahead and water the following plant. (${
      totalCount - currentPlantIndex - 1
    } out of ${totalCount} remaining)`;
  }, []);

  const isLastItem = useCallback((currentPlantIndex, totalCount) => {
    return totalCount === currentPlantIndex + 1;
  }, []);

  const onWateredPlantPress = useCallback(
    (currentPlantIndex, isLastOne, skip = false) => {
      if (isLastOne) {
        if (!skip) {
          //  TODO: Call required API
        }
        navigation.navigate('WateringProcessFinished');
      } else {
        if (!skip) {
          //  TODO: Call required API
        }
        setPlantIndex(currentPlantIndex + 1);
      }
    },
    []
  );

  return (
    <View>
      <WateringProcessTotalWaterNeeded
        waterAmount={data
          .slice(plantIndex)
          .map((x) => x.waterAmount)
          .reduce((x, y) => x + y, 0)}
        generateOutputText={generateOutputText}
      />
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingVertical: 30,
            paddingHorizontal: 10,
          }}
        >
          {generateRemainingText(plantIndex, data.length)}
        </Text>

        <WateringProcessListItem
          waterAmount={data[plantIndex].waterAmount}
          imageUrl={data[plantIndex].url}
          name={data[plantIndex].name}
          hideDownEnable
          hideUpEnable
          hideBottomDivider
        />

        <Button
          onPress={() => {
            onWateredPlantPress(
              plantIndex,
              isLastItem(plantIndex, data.length)
            );
          }}
          buttonStyle={{paddingVertical: 40}}
          titleStyle={{
            fontWeight: 'bold',
          }}
        >
          <Icon name="save" color="white" />I watered this plant!
        </Button>

        <Button
          onPress={() => {
            onWateredPlantPress(
              plantIndex,
              isLastItem(plantIndex, data.length),
              true
            );
          }}
          titleStyle={{
            fontSize: 14,
            color: 'black',
            fontWeight: 'bold',
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            paddingVertical: 30,
          }}
        >
          Skip for now!
        </Button>
      </View>
    </View>
  );
};

WateringProcessStarted.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export const HeaderLeft = ({navigation}) => {
  return (
    <Button
      titleStyle={{
        color: 'black',
      }}
      buttonStyle={{
        backgroundColor: 'transparent',
      }}
      onPress={() => {
        navigation.navigate('Home');
      }}
    >
      Cancel
    </Button>
  );
};

HeaderLeft.propTypes = {
  navigation: PropTypes.object,
};

WateringProcessStarted.HeaderLeft = HeaderLeft;
