import React from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {spacing, fontSizes} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {usePickerState} from '../../services/usePicker';

const PickerForm = () => {
  const {
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
  } = usePickerState();
  return (
    <View style={styles.pickerWrapper}>
      <DropDownPicker
        zIndex={3000}
        zIndexInverse={1000}
        open={openLastWater}
        onOpen={onLastWaterOpen}
        value={lastWater}
        items={lastWaterItem}
        setOpen={setOpenLastWater}
        setValue={setLastWater}
        setItems={setLastWaterItem}
        listMode="SCROLLVIEW"
        placeholder="Last time the plant was watered?"
        containerStyle={styles.picker}
        textStyle={styles.textPicker}
        selectedItemLabelStyle={{fontWeight: 'bold'}}
      />
      <DropDownPicker
        zIndex={1000}
        zIndexInverse={3000}
        placeholder="Notification time preferences"
        open={openNotificationTime}
        value={notificationTime}
        items={notificationTimeItem}
        setItems={setNotificationTimeItem}
        setOpen={setOpenNotificationTime}
        setValue={setNotificationTime}
        listMode="SCROLLVIEW"
        onOpen={onNotificationTimeOpen}
        containerStyle={styles.picker}
        textStyle={styles.textPicker}
        selectedItemLabelStyle={{fontWeight: 'bold'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: spacing.xxl,
    width: '90%',
    marginBottom: spacing.lg,
    marginLeft: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.primary100,
  },
  textPicker: {
    fontSize: fontSizes.md,
    color: colors.primary700,
  },
});

export default PickerForm;
