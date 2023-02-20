import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WateringProcessList} from './WateringProcessList';
import {Button} from '@rneui/themed';
import {useAssets} from 'expo-asset';

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
 * Move Items in array
 */
const arrayMove = (arr, fromIndex, toIndex) => {
  const newArr = [...arr];
  newArr.splice(toIndex, 0, newArr.splice(fromIndex, 1)[0]);
  return newArr;
};

export const WateringProcess = () => {
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
      <Button style={{marginTop: 10}}>Start!</Button>
    </ScrollView>
  );
};

WateringProcess.propTypes = {};
