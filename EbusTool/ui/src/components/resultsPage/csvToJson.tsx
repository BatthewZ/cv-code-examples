import {csvData} from './csvData';

type LinesToMake = {};

export function convertData(startingRow = 1, minuteInterals = 1) {
  //
  const rows = csvData.split('\n');
  console.log(rows[0]);
  const aDateTimeInfo = rows[1].split(',')[0];
  //   let dateTime = new Date(aDateTimeInfo);

  const data = [];

  let highestValue = 0;

  for (let i = 1; i < rows.length; i += minuteInterals) {
    // for (let i = 1; i < 500; i += minuteInterals) {
    const info = rows[i].split(',');
    data.push({
      name: info[0],
      value: info[1],
    });

    highestValue = +info[1] > highestValue ? +info[1] : highestValue;

    // data.rows.push({x: new Date(info[0]), y: +info[1]});
  }

  console.log(data[1]);

  const infoForGraph = {
    data: data,
    highestValue: round_to_nearest_10(highestValue),
    valueName: rows[0].split(',')[1],
  };

  console.log(round_to_nearest_10(highestValue));

  return infoForGraph;
}

export function convertCsvToGraphJson(allDataAsString: string) {
  const rows = allDataAsString.split('\n');
  const headings = rows[0].split(',');
  let highestValue = 0;
  const data = [];
  let numOfIterations = 0;
  for (let i = 1; i < rows.length; i += 200) {
    if (i > rows.length) break;
    const rowInfoArray = rows[i].split(',');
    const rowObject: any = {name: rowInfoArray[0]};
    for (let j = 1; j < rowInfoArray.length; j++) {
      rowObject[headings[j]] = rowInfoArray[j];
      highestValue = +rowInfoArray[j] > highestValue ? +rowInfoArray[j] : highestValue;
    }
    data.push(rowObject);
    numOfIterations++;
  }
  highestValue = round_to_nearest_10(highestValue);

  console.log(highestValue);

  return {
    data: data,
    highestValue: highestValue,
  };
}

function round_to_nearest_10(num: number) {
  return Math.round(num / 10) * 10;
}
