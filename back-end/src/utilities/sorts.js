// Order an array of objects based on another array order
// Sắp xếp column dựa trên sắp xếp 1 mảng ColumnOrder nằm ngoài column

const mapOrder = (array, order, key) => {
  if (!array || !order || !key) return [];
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
  return array;
};

export { mapOrder };
