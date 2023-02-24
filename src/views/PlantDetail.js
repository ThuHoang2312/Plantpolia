import PropTypes from 'prop-types';
import UserPlantDetail from '../components/Home/UserPlantDetail';

const PlantDetail = ({navigation, route}) => {
  return <UserPlantDetail navigation={navigation} plant={route.params.plant} />;
};

PlantDetail.propTypesXX = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default PlantDetail;
