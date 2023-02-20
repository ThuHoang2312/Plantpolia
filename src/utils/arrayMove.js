export const arrayMove = (arr, fromIndex, toIndex) => {
  const newArr = [...arr];
  newArr.splice(toIndex, 0, newArr.splice(fromIndex, 1)[0]);
  return newArr;
};
