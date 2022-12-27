const puppeteer = require('puppeteer');
const helper = require('./helpers/helper');

async function getGrimDawn(grimDawnURL) {
  if (!grimDawnURL.match(/^(https:\/\/www\.grimtools\.com\/calc\/).+$/)) {
    console.log('There is an error with the URL');
    return {errMsg: 'There is an error with the grimtools url.'};
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  console.log('Opening browser...');
  const page = await browser.newPage();

  // Don't trigger ad scripts.
  await page.setRequestInterception(true);
  page.on('request', (interceptedRequest) => {
    if (interceptedRequest.url() === 'https://s.nitropay.com/ads-835.js') {
      interceptedRequest.abort();
    } else interceptedRequest.continue();
  });

  const attributes = {
    physique: 0,
    cunning: 0,
    spirit: 0,
  };

  // Get attributes
  page.on('response', async (response) => {
    let theResponse;
    try {
      theResponse = await response.json();
      if (theResponse.data.bio.cunning !== undefined) attributes.cunning = theResponse.data.bio.cunning;
      if (theResponse.data.bio.physique !== undefined) attributes.physique = theResponse.data.bio.physique;
      if (theResponse.data.bio.spirit !== undefined) attributes.spirit = theResponse.data.bio.spirit;
    } catch (error) {}
  });

  console.log('Opening page...');
  await page.goto(grimDawnURL);

  console.log('Getting attributes...');
  //   await page.waitForSelector('#content');

  console.log('Getting skills...');
  const skills = await page.evaluate(() => {
    return dumpSkills();
  });

  console.log('Getting devotions...');
  const devotions = await page.evaluate(() => {
    return dumpDevotion();
  });

  console.log('Getting items...');
  let items = await page.evaluate(() => {
    return dumpItems();
  });

  for (const skill of skills) {
    skill.details = skill.details.split('\nCelestial Power')[0].trim();
  }

  console.log(skills);

  const classes = [...skills].filter((skill) => helper.isClassName(skill.name));
  const associatedSkills = helper.associateParentAndChildSkills(
    skills.filter((skill) => !helper.isClassName(skill.name))
  );
  const devotionSkills = helper.getDevotionSkills(devotions);
  items = helper.formatItems(items);

  for (const skill of associatedSkills) {
    console.log(skill.name);
    for (const child of skill.children) {
      console.log(' - ', child.name);
    }
  }

  const character = {
    classes: classes,
    attributes: attributes,
    skills: associatedSkills,
    devotions: devotionSkills,
    items: items,
    url: grimDawnURL,
  };

  browser.close();
  console.log('GGD2: Returning character...');
  return character;
}

function getTestChar() {
  // const url = 'https://www.grimtools.com/calc/';
  const Barrage = `https://www.grimtools.com/calc/Q2z07a9Z`;
  const Deadeye = `https://www.grimtools.com/calc/q2mpWDoN`;
  const Shielder = `https://www.grimtools.com/calc/wV11QWwV`;
  const Illuminance = `https://www.grimtools.com/calc/eVLMDlLZ`;

  const SlowMage = `https://www.grimtools.com/calc/nZo3aKvZ`;

  const writer = require('./saveCharJson');
  getGrimDawn(SlowMage).then((char) => writer.writeJsonToFile(char, 'testChar'));
  console.log('Character written to file.');
}

// getTestChar();

module.exports = {getGrimDawn};
