const bcrypt = require('bcrypt');
const crud = require('./crud');
const helper = require('./helpers');

const table = {
  users: 'cc-a3-users',
  lessons: 'cc-a3-lessons',
};

// Entrypoint to the lambda function
exports.handler = async (event, context, callback) => {
  console.log('\n\n');
  console.log('Event.body is: ', event.body);
  console.log('\n\n');

  const data = event.body ? JSON.parse(event.body) : event;
  const operation = event.operation ?? data.operation ?? 'No Operation';

  // For later, when getting individual lessons:
  // const GETQueryParams = event.queryStringParameters;

  // While testing CORS:
  // return {
  //   statusCode: 200,
  //   headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   },
  //   // body: JSON.stringify({msg: "Yeah it's working! Here are your GET params:", params: GETQueryParams}),
  //   body: JSON.stringify({msg: "Yeah it's working!", event: event, eventBody: data, operation: operation}),
  // }

  let respBody = JSON.stringify('Hello from Lambda! Your operation was: ' + operation);

  switch (operation) {
    case 'login':
      respBody = await login(data);
      break;
    case 'register':
      respBody = await register(data);
      break;
    case 'getLessons':
      respBody = await getLessons();
      break;
    case 'createLesson':
      respBody = await createLesson(data);
      break;
    case 'getLesson':
      respBody = await getLesson(data);
      break;
    case 'deleteLesson':
      respBody = await deleteLesson(data);
      break;
    default:
      callback(`Unknown operation ${operation}`);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(respBody),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };

  return response;
};

async function deleteLesson(event) {
  console.log('deleteLesson triggered.');
  const success = await crud.del(table.lessons, {lessonId: event.lessonId, user_email: event.user_email});
  return {success: true, crudDel: success};
}

async function getLessons() {
  const lessons = await crud.get(table.lessons);
  return {success: true, lessons: helper.simplifyResults(lessons)};
}

async function getLesson(event) {
  console.log('getLesson triggered.');

  //---
  // return {success: true, msg: "Yep"};

  const lesson = await crud.get(table.lessons, 'lessonId', event.lessonId);

  console.log('Lesson Found: ', lesson);

  if (lesson) return {success: true, lesson: helper.simplifyResult(lesson)};

  return {success: true, errMsg: 'Could not find a lesson with that ID.'};
}

async function createLesson(event) {
  if (!event.email || !event.lessonID) return {errMsg: 'Lesson email or ID was invalid; lesson not uploaded.'};

  await crud.put(table.lessons, {
    lessonId: event.lessonID,
    user_email: event.email,
    type: event.type,
    description: event.description,
    title: event.title,
    steps: JSON.stringify(event.steps ?? {}),
  });

  return {success: true};
}

// --- Other methods
async function login(event) {
  if (!helper.existsWhenTrimmed(event.password) || !helper.existsWhenTrimmed(event.email)) {
    return {errMsg: 'Server received empty fields. Please contact an administrator.'};
  }

  const user = await crud.get(table.users, 'email', event.email);

  if (!user || !bcrypt.compareSync(event.password, user.password.S)) {
    return {errMsg: 'Login or Password was incorrect.'};
  }

  return {success: true, email: user.email.S, username: user.username.S};
}

async function register(event) {
  if (!event.username || !event.password || !event.email) {
    return {errMsg: 'Server received empty fields. Please contact an administrator.'};
  }

  if (await crud.get(table.users, 'email', event.email)) {
    return {errMsg: 'This email account is already registered.'};
  }

  if (await crud.get(table.users, 'username', event.username)) {
    return {errMsg: 'This username account is already taken.'};
  }

  // Hash the password
  let hashedPassword = bcrypt.hashSync(event.password, 10);

  if (!hashedPassword)
    return {errMsg: 'Something went wrong hashing the password. The OG password was:  ' + event.password};

  await crud.put(table.users, {username: event.username, password: hashedPassword, email: event.email});
  return {success: true};
}
