import {useCallback, useState} from 'react';

export const useNewUserPlantForm = ({primaryPlant}) => {
  /** @type {import('../types/BaseModels').PrimaryPlantModel} */
  const {description} = primaryPlant;
  // Name of plant
  const [title, setTitle] = useState(primaryPlant.title);

  // Picker open states
  const [openLastTimeWateredDropdown, setOpenLastTimeWateredDropdown] =
    useState(false);

  const [openLocationDropdown, setOpenLocationDropdown] = useState(false);

  const [lastTimeWateredDropdownOptions] = useState([
    {label: 'Today', value: '0'},
    {label: 'Yesterday', value: 1},
    {label: 'About one week ago', value: 7},
    {label: 'About two week ago', value: 14},
    {label: 'Not sure/ Never water', value: description.waterInterval},
  ]);
  const [
    selectedLastTimeWateredDropdownOption,
    setSelectedLastTimeWateredDropdownOption,
  ] = useState(null);

  const [locationOptions] = useState([
    {label: 'Living Room', value: 'Living Room'},
    {label: 'Bedroom', value: 'Bedroom'},
    {label: 'Kitchen', value: 'Kitchen'},
    {label: 'Office', value: 'Office'},
    {label: 'Bathroom', value: 'Bathroom'},
    {label: 'Balcony / Terrace', value: 'Balcony / Terrace'},
    {label: 'Hall', value: 'Hall'},
  ]);
  const [selectedLocationDropdownOption, setSelectedLocationDropdownOption] =
    useState(null);

  // Close other picker when one is in used
  const onLastTimeWateredDropdownOpen = useCallback(() => {
    setOpenLocationDropdown(false);
  }, []);

  const onLocationDropdownOpen = useCallback(() => {
    setOpenLastTimeWateredDropdown(false);
  }, []);

  return {
    title,
    setTitle,

    lastTimeWateredDropdownOptions,
    selectedLastTimeWateredDropdownOption,
    setSelectedLastTimeWateredDropdownOption,
    openLastTimeWateredDropdown,
    onLastTimeWateredDropdownOpen,
    setOpenLastTimeWateredDropdown,

    locationOptions,
    openLocationDropdown,
    selectedLocationDropdownOption,
    onLocationDropdownOpen,
    setOpenLocationDropdown,
    setSelectedLocationDropdownOption,
  };
};
