import {AsyncStorage} from 'react-native';

import HttpClient from '../network';

export const storeItem = async (key, item) => {
  try {
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {}
};

const getItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    return error;
  }
};

export const removeItem = async key => {
  try {
    var jsonOfItem = await AsyncStorage.removeItem(key);
    return jsonOfItem;
  } catch (error) {}
};

const setAuthorizationToken = token => {
  HttpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

//delete function is added but we are not using it right now
const deleteAuthorizationToken = () => {
  HttpClient.defaults.headers.common['Authorization'] = '';
  return removeItem('token').then(() => {
    return true;
  });
};

export function setOauthToken(token) {
  return storeItem('token', token).then(() => {});
}

export function checkToken() {
  getItem('token').then(val => {
    if (val) {
      setAuthorizationToken(val);
    }
  });
}
