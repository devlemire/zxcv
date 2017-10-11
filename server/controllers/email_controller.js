const app = require('../index');
const json2csv = require('json2csv');
const fields = [ 'email' ];
const password = require('../config').emailPassword;

module.exports = {
  store: ( req, res, next ) => {
    const db = app.get('db');
  
    if ( req.query.email ) {
      db.storeEmail({ email: req.query.email })
      .then( results => res.status(200).send('Email address has been stored.') )
      .catch( err => res.status(409).send( err ) );
    } else {
      res.status(409).send({ error: 'Need email in the request query.' });
    }
  },

  read: ( req, res, next ) => {
    const db = app.get('db');
    
    if ( req.query.password === password ) {
      db.getEmails().then( results => {
        const downloadable = json2csv({ data: results, fields: fields });
        res.attachment('emails.csv');
        res.status(200).send(downloadable);
      }).catch( err => console.log('Error fetching emails:', err) );
    } else {
      res.status(401).send({ error: 'Not authorized.' });
    }
  }
};