module.exports = (normalizedData, denormalizedData) => {
  let normalizedLength = JSON.stringify(normalizedData).length;
  let denormalizedLength = JSON.stringify(denormalizedData).length;

  console.log(JSON.stringify(normalizedData).length);
  console.log(JSON.stringify(denormalizedData).length);

  return ((denormalizedLength - normalizedLength) / denormalizedLength) * 100;
};
