'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/note_app'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/note_app'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
