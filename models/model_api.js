const mapCleanKeys = (mongooseObj, keysToClean) => {
  const objectToClean = {};
  Object.keys(mongooseObj._doc).forEach(keyToMap => {
    if (!keysToClean.includes(keyToMap))
      objectToClean[keyToMap] = mongooseObj[keyToMap];
  });
  return objectToClean;
};

const cleanPlayersFunc = async (playersArray, cleanedPlayers) => {
  playersArray.forEach(async p => {
    const cleanPlayer = await mapCleanKeys(p, ["email", "password"]);
    cleanedPlayers.push(cleanPlayer);
  });
  return cleanedPlayers;
};

module.exports = {
  mapCleanKeys,
  cleanPlayersFunc
};
