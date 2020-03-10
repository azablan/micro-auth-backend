  
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = '0E02C75C1BF984BC53B167296CF054A3E20E92416BFE9388EF451AF881C6F8EE';

const generateToken = (payload) => {
  const oneHour = 60 * 60;
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      PRIVATE_KEY,
      { expiresIn: oneHour },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token, 
      PRIVATE_KEY,
      (error, payload) => {
        if (error) {
          reject(error);
        } else {
          resolve(payload);
        }
      }
    );
  });
};

module.exports = {
  generateToken,
  verifyToken
};