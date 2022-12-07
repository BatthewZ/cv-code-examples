import AWS from 'aws-sdk';
import {renameFile} from '../helper/helpers';
import {API_OPERATION, Lesson, Login, POSTABLE, User} from '../helper/types';
import {accessKey, secretAccessKey, sessionToken} from './tempCreds';

const API_URL = `https://xjc7gwf25j.execute-api.us-east-1.amazonaws.com/a3/a3-dynamo`;
// const S3_URL = `https://ohmyfc139d.execute-api.us-east-1.amazonaws.com/cc-a3-uploader/cc-a3/`; // + image.jpg

export const apiCall = {
  test: () => get(''),
  register: async (user: User) => register(user),
  login: async (login: Login) => logUserIn(login),
  createLesson: async (lesson: Lesson) => uploadLesson(lesson),
  getLessons: async () => getAllLessons(),
  getLesson: async (id: string) => getLesson(id),
  deleteLesson: async (id: string, email: string) => delLesson(id, email),
};

async function getAllLessons() {
  return await post('getLessons', null);
}

async function getLesson(id: string) {
  return await post('getLesson', {lessonId: id});
}

async function delLesson(id: string, email: string) {
  return await post('deleteLesson', {lessonId: id, user_email: email});
}

async function get(getString: string) {
  // console.log('Trying...!');
  try {
    const response = await fetch(API_URL + getString);
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (e) {
    // console.log('API Error:', e);
  }
  return {};
}

async function post(operation: API_OPERATION, object: POSTABLE | null) {
  const body = {...object, operation: operation};

  // console.log('Attempting to post: ', JSON.stringify(body));
  try {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body),
      // body: formData,
    };
    const response = await fetch(API_URL, requestOptions);
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (e) {
    console.log('Something went wrong trying to POST: ', e);
  }
}

async function logUserIn(login: Login) {
  // console.log('Attemping to log in...');
  return await post('login', login);
}

async function register(user: User) {
  // console.log('Attempting to register...');
  return await post('register', user);
}

async function uploadLesson(lesson: Lesson) {
  // console.log('Attempting to upload lesson...');
  for (const step of lesson.steps) {
    if (step.file) {
      const renamedFile = renameFile(step.id, step.file[0]);
      uploadFile(renamedFile);
      step.url = 'https://cc-a3.s3.amazonaws.com/' + renamedFile.name;
      step.file = undefined;
    }
  }
  return await post('createLesson', lesson);
}

function uploadFile(file: File) {
  const S3_BUCKET = 'cc-a3';
  const REGION = 'us-east-1';

  process.env.AWS_SDK_LOAD_CONFIG = '1';

  AWS.config.update({
    // Check that this works when on an ec2 instance.
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken,
  });

  const myBucket = new AWS.S3({
    params: {Bucket: S3_BUCKET},
    region: REGION,
  });

  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name,
  };

  // console.log('Attempting to upload file.');
  // console.log('File name is: ', file.name);

  myBucket
    .putObject(params)
    .on('httpUploadProgress', (evt) => {
      // Used for showing upload progress:
      // setProgress(Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err) => {
      if (err) console.log(err);
    });
}
