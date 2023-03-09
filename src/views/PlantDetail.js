import PropTypes from 'prop-types';
import UserPlantDetail from '../components/UserPlant/UserPlantDetail';

const PlantDetail = ({navigation, route}) => {
  // console.log(route.params.plant);
  return <UserPlantDetail navigation={navigation} plant={route.params.plant} />;
};

PlantDetail.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default PlantDetail;
