'use strict';
require('dotenv').config();
const {
  ORACLE_CLIENT = 'oracledb',
  ORACLE_USER,
  ORACLE_PASSWORD,
  ORACLE_CONNECTION_STRING
} = process.env;

const connectionData = {
  client: ORACLE_CLIENT,
  connection: {
    user: ORACLE_USER,
    password: ORACLE_PASSWORD,
    connectString: ORACLE_CONNECTION_STRING
  }
};

module.exports = connectionData;
