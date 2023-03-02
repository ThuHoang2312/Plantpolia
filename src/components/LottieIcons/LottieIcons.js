import LottieView from 'lottie-react-native';
import WalkingPlant from './WalkingPlant.json';
import PropTypes from 'prop-types';

const icons = {
  WalkingPlant: WalkingPlant,
};

const LottieIcons = ({iconName, focused, loop, autoPlay}) => {
  return (
    <LottieView
      ref={(animation) => {
        if (animation && focused) {
          animation.play();
        }
      }}
      resizeMode="contain"
      source={icons[iconName]}
      loop={loop ?? false}
      autoPlay={autoPlay ?? false}
    />
  );
};

LottieIcons.propTypes = {
  iconName: PropTypes.string,
  focused: PropTypes.bool,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
};

export default LottieIcons;
