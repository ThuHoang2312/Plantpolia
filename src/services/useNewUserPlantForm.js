import {useCallback, useContext, useState} from 'react';
import {MainContext} from '../contexts/MainContext';

/** @type {import('../types/TypedHooks').UseNewUserPlantForm} */
export const useNewUserPlantForm = ({primaryPlant}) => {
  // Name of plant
  const [title, setTitle] = useState(primaryPlant.title);

  // Picker open states
  const [openLastWater, setOpenLastWater] = useState(false);
  const [openNotificationTime, setOpenNotificationTime] = useState(false);
  const [openPlantLocation, setOpenPlantLocation] = useState(false);
  const [plantLocation, setPlantLocation] = useState('');

  // Picker value states
  const {lastWater, setLastWater, notificationTime, setNotificationTime} =
    useContext(MainContext);

  // Picker items
  const [lastWaterItem, setLastWaterItem] = useState([
    {label: 'Today', value: 'Today'},
    {label: 'Yesterday', value: 'Yesterday'},
    {label: 'About one week ago', value: 'About one week ago'},
    {label: 'About two week ago', value: 'About two week ago'},
    {label: 'Not sure/ Never water', value: 'Not sure/ Never water'},
  ]);

  const [notificationTimeItem, setNotificationTimeItem] = useState([
    {label: 'Morning', value: 'Morning'},
    {label: 'Afternoon', value: 'Afternoon'},
    {label: 'Evening', value: 'Evening'},
  ]);

  const [plantLocationItem, setPlantLocationItem] = useState([
    {label: 'Living Room', value: 'Living Room'},
    {label: 'Bedroom', value: 'Bedroom'},
    {label: 'Kitchen', value: 'Kitchen'},
    {label: 'Office', value: 'Office'},
    {label: 'Bathroom', value: 'Bathroom'},
    {label: 'Balcony / Terrace', value: 'Balcony / Terrace'},
    {label: 'Hall', value: 'Hall'},
  ]);

  // Close other picker when one is in used
  const onLastWaterOpen = useCallback(() => {
    setOpenNotificationTime(false);
    setOpenPlantLocation(false);
  }, []);

  const onNotificationTimeOpen = useCallback(() => {
    setOpenLastWater(false);
    setOpenPlantLocation(false);
  }, []);

  const onPlantLocationOpen = useCallback(() => {
    setOpenLastWater(false);
    setOpenNotificationTime(false);
  }, []);

  return {
    title,
    setTitle,
    lastWater,
    lastWaterItem,
    notificationTime,
    notificationTimeItem,
    plantLocationItem,
    onPlantLocationOpen,
    onLastWaterOpen,
    onNotificationTimeOpen,
    setPlantLocationItem,
    setLastWater,
    setLastWaterItem,
    setNotificationTime,
    setNotificationTimeItem,
    openLastWater,
    openNotificationTime,
    setOpenLastWater,
    setOpenNotificationTime,
    plantLocation,
    setPlantLocation,
    openPlantLocation,
    setOpenPlantLocation,
  };
};
