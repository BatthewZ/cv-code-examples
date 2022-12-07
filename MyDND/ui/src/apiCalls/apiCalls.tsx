import {Character} from '../types/types';
import {API_URL} from './API_URL';

type API_OPERATION =
  | 'login'
  | 'getCharacters'
  | 'register'
  | 'updatePassword'
  | 'updateCharacter'
  | 'newCharacter'
  | 'deleteCharacter';

type username = {
  username: string;
};

type login = {
  password: string;
} & username;

type register = {
  adminKey: string;
} & login;

type collection = {
  collection: string;
};

type passwordUpdate = {
  oldPassword: string;
} & login;

type characterForDB = {
  character: Character;
};

type charData = {charId: string; character: Character; user: string};

type characterRecord = {
  charRecord: charData;
};

type deleteChar = {
  charId: string;
};

type POSTABLE =
  | login
  | collection
  | register
  | username
  | passwordUpdate
  | characterForDB
  | characterRecord
  | deleteChar;

async function post(operation: API_OPERATION, object: POSTABLE | null) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(object),
    };
    const response = await fetch(API_URL + operation, requestOptions);
    // console.log(response);
    const json = await response.json();
    // console.log(operation + ': ', json);
    return json;
  } catch (e) {
    console.log('Something went wrong trying to POST: ', e);
  }
}

export async function login(username: string, password: string) {
  return await post('login', {username: username, password: password});
}

export async function register(username: string, password: string, adminKey: string) {
  return await post('register', {username: username, password: password, adminKey: adminKey});
}

export async function getCharacters(username: string) {
  const charData = await post('getCharacters', {username: username});
  return charData.map((data: charData) => data.character);
}

export async function updatePassword(username: string, password: string, oldPassword: string) {
  return await post('updatePassword', {username: username, password: password, oldPassword: oldPassword});
}

export async function updateCharacter(character: Character) {
  post('updateCharacter', {character: character});
}

export async function newCharacter(character: Character) {
  post('newCharacter', {
    charRecord: {charId: character.charId, character: character, user: sessionStorage.getItem('user') ?? ''},
  });
}

export async function deleteCharacter(charId: string) {
  await post('deleteCharacter', {charId: charId});
}
