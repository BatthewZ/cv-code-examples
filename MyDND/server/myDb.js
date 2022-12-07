const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();

async function getCollection(collectionName) {
  console.log('Attempting to get collection...');
  try {
    const collection = await firestore.collection(collectionName).get();

    if (!collection) return {errMsg: 'Invalid collection'};

    console.log('Attempting to map...');

    return collection.docs.map((doc) => doc.data());
  } catch (e) {
    console.log('Something went wrong:');
    console.log(e);
    return {errMsg: e};
  }
}

async function getItem(collection, fieldName, itemMatch) {
  try {
    const query = await firestore.collection(collection).where(fieldName, '==', itemMatch).get();
    if (!query || !query.docs[0]) return;

    return query.docs[0].data();
  } catch (e) {
    console.log('Something went wrong:');
    console.log(e);
    return;
  }
}

async function updateItem(collection, fieldName, itemMatch, updateData) {
  try {
    const query = await firestore.collection(collection).where(fieldName, '==', itemMatch).get();
    if (!query || !query.docs[0]) return;

    await firestore
      .collection(collection)
      .doc(await query.docs[0].id)
      .update(updateData);

    return {success: true};
  } catch (e) {
    console.log(e);
    return;
  }
}

async function createItem(collection, item) {
  console.log('Creating item...');
  return await firestore.collection(collection).add(item);
}

async function deleteItem(collection, fieldName, itemMatch) {
  try {
    const query = await firestore.collection(collection).where(fieldName, '==', itemMatch).get();
    if (!query || !query.docs[0]) return;

    await firestore
      .collection(collection)
      .doc(await query.docs[0].id)
      .delete();

    return {success: true};
  } catch (e) {
    console.log(e);
    return;
  }
}

async function getUser(username) {
  return getItem('users', 'username', username);
}

async function getCharacters(username) {
  console.log(`Username is: '${username}'`);
  try {
    const query = await firestore.collection('characters').where('user', '==', username).get();
    return query.docs.map((doc) => doc.data());
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getCollection,
  getItem,
  updateItem,
  createItem,
  deleteItem,
  getUser,
  getCharacters,
};
