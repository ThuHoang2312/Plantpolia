import {useCallback, useContext, useState} from 'react';
import {MainContext} from '../contexts/MainContext';

export const usePickerState = () => {
  // Picker open states
  const [openLastWater, setOpenLastWater] = useState(false);
  const [openNotificationTime, setOpenNotificationTime] = useState(false);

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

  // Close other picker when one is in used
  const onLastWaterOpen = useCallback(() => {
    setOpenNotificationTime(false);
  }, []);

  const onNotificationTimeOpen = useCallback(() => {
    setOpenLastWater(false);
  }, []);

  return {
    lastWater,
    lastWaterItem,
    notificationTime,
    notificationTimeItem,
    onLastWaterOpen,
    onNotificationTimeOpen,
    setLastWater,
    setLastWaterItem,
    setNotificationTime,
    setNotificationTimeItem,
    openLastWater,
    openNotificationTime,
    setOpenLastWater,
    setOpenNotificationTime,
  };
};
