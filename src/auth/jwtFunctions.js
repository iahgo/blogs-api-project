const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'senhaSecreta';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30min',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    console.log('deu erro na merda do tokennnnnnnnnnnnnnnnnnnn');
    console.log(error);
    return { error };
  }
};

module.exports = { createToken, verifyToken };