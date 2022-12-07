// JSON formatting Helpers:
function simplifyResults(resultsArray) {
  if (!resultsArray || !resultsArray.length) return resultsArray;

  const simplifiedResults = [];
  for (const result of resultsArray) {
    simplifiedResults.push(simplifyResult(result));
  }
  // console.log('------ SIMPLIFIED RESULTS IS: ', simplifiedResults);
  return simplifiedResults;
}

function simplifyResult(result) {
  if (!result) return;
  const simplerObject = {};
  const keys = Object.keys(result);
  for (const attributeName of keys) {
    simplerObject[attributeName] = result[attributeName].S;
  }
  return simplerObject;
}

function existsWhenTrimmed(string) {
  if (string && string.trim().length) return true;
  return false;
}

module.exports = {
  simplifyResult,
  simplifyResults,
  existsWhenTrimmed,
};
