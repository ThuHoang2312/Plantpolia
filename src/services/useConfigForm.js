import {useContext, useState} from 'react';
import {MainContext} from '../contexts/MainContext';

export const useConfigForm = () => {
  // Name of plant
  const [title, setTitle] = useState('');

  // Picker open states
  const [openPlantLocation, setOpenPlantLocation] = useState(false);
  const {location, setLocation} = useContext(MainContext);

  // Picker items

  const [plantLocationItem, setPlantLocationItem] = useState([
    {label: 'Living Room', value: 'Living Room'},
    {label: 'Bedroom', value: 'Bedroom'},
    {label: 'Kitchen', value: 'Kitchen'},
    {label: 'Office', value: 'Office'},
    {label: 'Bathroom', value: 'Bathroom'},
    {label: 'Balcony / Terrace', value: 'Balcony / Terrace'},
    {label: 'Hall', value: 'Hall'},
    {label: 'Others', value: 'Others'},
  ]);

  return {
    title,
    setTitle,

    plantLocationItem,
    setPlantLocationItem,
    openPlantLocation,
    setOpenPlantLocation,
    location,
    setLocation,
  };
};
