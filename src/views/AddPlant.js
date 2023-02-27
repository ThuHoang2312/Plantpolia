import PropTypes from 'prop-types';

import PlantList from '../components/AddPlant/PlantList';

const AddPlant = ({navigation}) => {
  // console.log('ADD PLANT');
  return (
    <>
      <PlantList navigation={navigation} myFilesOnly={true} />
    </>
  );
};

AddPlant.propTypes = {
  navigation: PropTypes.object,
};

export default AddPlant;
