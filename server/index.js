const express = require('express');
const cors = require('cors');
const massive = require('massive');
const path = require('path');
const config = require('./config.js');

const app = module.exports = express();

app.use( cors() );
massive({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
}).then( db => {
  app.set('db', db);
}).catch( err => console.log('Error connecting to database:', err) );

// Email Routes
app.use('/api/emails', require('./routes/email_router'));

// Serving front-end files
app.use( express.static( `${__dirname}/../build` ) );
app.get( '*', ( req, res, next ) => {
  res.sendFile( path.resolve( `${__dirname}/../build/index.html` ) );
});

app.listen( config.port || 3000, () => console.log(`Listening on port ${ config.port || 3000 }`) );