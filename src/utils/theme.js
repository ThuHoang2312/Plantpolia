import {createTheme} from '@rneui/themed';
import {colors} from './colors';
import {fontFamily} from './sizes';

export const theme = createTheme({
  lightColors: {
    primary: colors.primary500,
  },
  mode: 'light',
  components: {
    Button: {
      titleStyle: {
        fontFamily: fontFamily.regular,
      },
      buttonStyle: {},
      style: {},
      containerStyle: {},
    },
    Text: {
      style: {
        fontFamily: fontFamily.regular,
      },
      h1Style: {
        fontFamily: fontFamily.regular,
      },
    },
    Input: {
      inputStyle: {
        fontFamily: fontFamily.regular,
      },
    },
    ListItemTitle: {
      style: {
        fontFamily: fontFamily.regular,
      },
    },
    ListItemSubtitle: {
      style: {
        fontFamily: fontFamily.regular,
      },
    },
  },
});
