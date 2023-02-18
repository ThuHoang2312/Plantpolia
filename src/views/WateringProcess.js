import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '@rneui/themed';
import {useAssets} from 'expo-asset';
import PropTypes from 'prop-types';
import {WateringProcessList} from '../components/WateringProcess/WateringProcessList';
import {arrayMove} from '../utils/arrayMove';

const sampleData = [
  {
    id: 0,
    name: 'Monstra (Kitchen)',
    waterAmount: 100,
    url: null,
  },
  {
    id: 1,
    name: 'Monstra (Hallway)',
    waterAmount: 100,
    url: null,
  },
  {
    id: 2,
    name: 'General Succulent (Kitchen)',
    waterAmount: 100,
    url: null,
  },
  {
    id: 3,
    name: 'English Fresh Rosemary',
    waterAmount: 100,
    url: null,
  },
];

// eslint-disable-next-line valid-jsdoc
/**
 *  Here we get an array of plants
 *  and user will order the plants and watering process starts by navigating to {@link WateringProcessStarted}
 *  @param {object} props Props of component.
 *  @param {object} props.navigation React Navigation.
 *  @return {JSX.Element}
 */
export const WateringProcess = ({navigation}) => {
  //  TODO: remove when real data used.
  const [assets] = useAssets([require('../../assets/example-plant-1.jpg')]);

  //  TODO: replace with real data
  const [data, setData] = useState(sampleData);

  //  TODO: remove when real data used.
  useEffect(() => {
    if (assets) {
      setData(data.map((x) => ({...x, url: assets[0].localUri})));
    }
  }, [assets]);

  return (
    <ScrollView>
      <WateringProcessList
        items={data}
        onMoveUpPress={(index) => {
          setData(arrayMove(data, index, index - 1));
        }}
        onMoveDownPress={(index) => {
          setData(arrayMove(data, index, index + 1));
        }}
      />
      <Button
        style={{marginTop: 10}}
        onPress={() => {
          navigation.navigate('WateringProcessStarted', {
            data,
          });
        }}
      >
        Start!
      </Button>
    </ScrollView>
  );
};

WateringProcess.propTypes = {
  navigation: PropTypes.object,
};
