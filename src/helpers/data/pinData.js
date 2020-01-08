import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((result) => {
      const allPinsObj = result.data;
      const pins = [];
      if (allPinsObj != null) {
        Object.keys(allPinsObj).forEach((pinId) => {
          const newPin = allPinsObj[pinId];
          newPin.id = pinId;
          pins.push(newPin);
        });
      }
      resolve(pins);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const savePin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

export default {
  getPinsByBoardId,
  getSinglePin,
  deletePin,
  savePin,
};
