export const validateUploadFormData = (data, plant) => {
  // Validate data before upload
  const description = data.description;
  if (description.clean === '') {
    description.clean = plant.clean;
  }
  if (description.waterInstruction === '') {
    description.waterInstruction = plant.waterInstruction;
  }
  if (description.level === '') {
    description.level = plant.level;
  }
  if (description.liquidFertilizing === '') {
    description.liquidFertilizing = plant.liquidFertilizing;
  }
  if (description.otherNames === '') {
    description.otherNames = plant.otherNames;
  }
};
