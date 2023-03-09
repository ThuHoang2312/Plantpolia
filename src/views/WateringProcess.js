import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button} from '@rneui/themed';
import PropTypes from 'prop-types';
import {WateringProcessList} from '../components/WateringProcess/WateringProcessList';
import {arrayMove} from '../utils/arrayMove';
import {useMainContext} from '../contexts/MainContext';
import {checkPlantWaterNeed} from '../hooks/useUserPlantWateringEvent';
import {safeIntegerParse} from '../utils/safeIntegerParse';
import {fontFamily} from '../utils/sizes';

/**
 *  Here we get an array of plants
 *  and user will order the plants and watering process starts by navigating to {@link WateringProcessStarted}
 *  @param {object} props Props of component.
 *  @param {object} props.navigation React Navigation.
 *  @return {JSX.Element}
 */
export const WateringProcess = ({navigation}) => {
  const {userPlantList, wateringEventList} = useMainContext();

  const [userPlantListThatNeedsWater, setUserPlantListThatNeedsWater] =
    useState(
      userPlantList.filter((userPlant) => {
        const plantWateringEvents = wateringEventList.filter(
          (x) => x.file_id === userPlant.file_id
        );

        return checkPlantWaterNeed({
          plantWateringEvents,
          waterInterval: safeIntegerParse(userPlant.description.waterInterval),
        });
      })
    );

  return (
    <ScrollView>
      <WateringProcessList
        items={userPlantListThatNeedsWater}
        onMoveUpPress={(index) => {
          setUserPlantListThatNeedsWater(
            arrayMove(userPlantListThatNeedsWater, index, index - 1)
          );
        }}
        onMoveDownPress={(index) => {
          setUserPlantListThatNeedsWater(
            arrayMove(userPlantListThatNeedsWater, index, index + 1)
          );
        }}
      />
      <Button
        disabled={userPlantListThatNeedsWater.length === 0}
        style={{marginTop: 10}}
        onPress={() => {
          navigation.navigate('WateringProcessStarted', {
            userPlantListThatNeedsWater,
          });
        }}
        titleStyle={{fontFamily: fontFamily.regular}}
      >
        Start!
      </Button>
    </ScrollView>
  );
};

WateringProcess.propTypes = {
  navigation: PropTypes.object,
};
