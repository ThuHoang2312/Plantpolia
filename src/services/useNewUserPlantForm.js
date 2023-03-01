import {useCallback, useState} from 'react';

export const useNewUserPlantForm = ({primaryPlant}) => {
  // Name of plant
  const [title, setTitle] = useState(primaryPlant.title);

  // Picker open states
  const [openLastTimeWateredDropdown, setOpenLastTimeWateredDropdown] =
    useState(false);
  const [
    openPreferredNotificationTimeDropdown,
    setOpenPreferredNotificationTimeDropdown,
  ] = useState(false);
  const [openWateringIntervalDropdown, setOpenWateringIntervalDropdown] =
    useState(false);

  const [lastTimeWateredDropdownOptions] = useState([
    {label: 'Today', value: 'Today'},
    {label: 'Yesterday', value: 'Yesterday'},
    {label: 'About one week ago', value: 'About one week ago'},
    {label: 'About two week ago', value: 'About two week ago'},
    {label: 'Not sure/ Never water', value: 'Not sure/ Never water'},
  ]);
  const [
    selectedLastTimeWateredDropdownOption,
    setSelectedLastTimeWateredDropdownOption,
  ] = useState(null);

  const [preferredNotificationTimeDropdownOptions] = useState([
    {label: 'Morning', value: 'Morning'},
    {label: 'Afternoon', value: 'Afternoon'},
    {label: 'Evening', value: 'Evening'},
  ]);
  const [
    selectedPreferredNotificationTimeDropdownOption,
    setSelectedPreferredNotificationTimeDropdownOption,
  ] = useState(null);

  const [wateringIntervalOptions] = useState([
    {value: 1, label: 'Every day'},
    {value: 2, label: 'Every second day'},
    {value: 3, label: 'Every three days'},
    {value: 4, label: 'Every four days'},
    {value: 5, label: 'Every five days'},
    {value: 6, label: 'Every six days'},
    {value: 7, label: 'Every week'},
  ]);
  const [selectedWateringIntervalOption, setSelectedWateringIntervalOption] =
    useState(null);

  // Close other picker when one is in used
  const onLastTimeWateredDropdownOpen = useCallback(() => {
    setOpenPreferredNotificationTimeDropdown(false);
    setOpenWateringIntervalDropdown(false);
  }, []);

  const onPreferredNotificationTimDropdownOpen = useCallback(() => {
    setOpenLastTimeWateredDropdown(false);
    setOpenWateringIntervalDropdown(false);
  }, []);

  const onWateringIntervalDropdownOpen = useCallback(() => {
    setOpenLastTimeWateredDropdown(false);
    setOpenPreferredNotificationTimeDropdown(false);
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

    preferredNotificationTimeDropdownOptions,
    openPreferredNotificationTimeDropdown,
    selectedPreferredNotificationTimeDropdownOption,
    onPreferredNotificationTimDropdownOpen,
    setSelectedPreferredNotificationTimeDropdownOption,
    setOpenPreferredNotificationTimeDropdown,

    wateringIntervalOptions,
    openWateringIntervalDropdown,
    selectedWateringIntervalOption,
    onWateringIntervalDropdownOpen,
    setSelectedWateringIntervalOption,
    setOpenWateringIntervalDropdown,
  };
};
