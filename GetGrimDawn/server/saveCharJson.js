function writeJsonToFile(json, fileName) {
  if (!fileName.includes('.json')) fileName = fileName + '.json';

  var fs = require('fs');
  fs.writeFile('./testing/' + fileName, JSON.stringify(json), function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {writeJsonToFile};
