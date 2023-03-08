import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {WateringProcessInstruction} from '../components/WateringProcess/WateringProcessInstruction';
import {WateringProcessListItem} from '../components/WateringProcess/WateringProcessListItem';
import {Button, Icon, Text} from '@rneui/themed';
import {createPlantWateringEventName, uploadUrl} from '../utils/variables';
import {useApi} from '../hooks/ApiHooks';
import {useMainContext} from '../contexts/MainContext';
import {showToast} from '../utils/Toast';
import {useLogger} from '../services/useLogger';

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
  const {log} = useLogger('WateringProcessStarted');
  const {postCommentByMediaId} = useApi();
  const {token} = useMainContext();
  const [plantIndex, setPlantIndex] = useState(0);
  const [skippedPlantCount, setSkippedPlantCount] = useState(0);
  // data is array
  /** @type {import('../types/TypedComponents').WateringProcessStartedParams} */
  const {userPlantListThatNeedsWater} = route.params;

  const remainingText = `Go ahead and water the following plant. (${
    userPlantListThatNeedsWater.length - plantIndex - 1
  } out of ${userPlantListThatNeedsWater.length} remaining)`;

  const onWateredPlantPress = useCallback(
    async (skip = false) => {
      const isLastOne = userPlantListThatNeedsWater.length === plantIndex + 1;

      if (skip && isLastOne) {
        navigation.navigate('WateringProcessFinished', {
          skippedPlantCount: skippedPlantCount + 1,
        });
        return;
      }
      if (skip) {
        setSkippedPlantCount((prev) => prev + 1);
        setPlantIndex((prev) => prev + 1);
        return;
      }

      const plant = userPlantListThatNeedsWater[plantIndex];
      const [result, error] = await postCommentByMediaId(
        plant.file_id,
        createPlantWateringEventName(Date.now()),
        token
      );

      log(result);

      if (error) {
        showToast(error.message);
      }

      if (isLastOne) {
        navigation.navigate('WateringProcessFinished', {skippedPlantCount});
        return;
      }

      setPlantIndex((prev) => prev + 1);
    },
    [userPlantListThatNeedsWater, skippedPlantCount, plantIndex]
  );

  return (
    <View>
      <WateringProcessInstruction
        waterInstruction={
          userPlantListThatNeedsWater[plantIndex].description.waterInstruction
        }
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
          {remainingText}
        </Text>

        <WateringProcessListItem
          location={
            userPlantListThatNeedsWater[plantIndex].description.location
          }
          imageUrl={
            uploadUrl + userPlantListThatNeedsWater[plantIndex].thumbnails.w160
          }
          name={userPlantListThatNeedsWater[plantIndex].title}
          hideDownEnable
          hideUpEnable
          hideBottomDivider
        />

        <Button
          onPress={() => {
            onWateredPlantPress();
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
            onWateredPlantPress(true);
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
