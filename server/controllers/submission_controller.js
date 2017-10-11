const app = require('../index');
const json2csv = require('json2csv');
const fields = [ 'email', 'web', 'ios', 'uiux', 'qa', 'salesforce' ];
const password = require('../config').emailPassword;

module.exports = {
  store: ( req, res, next ) => {
    const db = app.get('db');
    const { email, web, ios, uiux, qa, salesforce } = req.body;
    
    if ( email ) {
      db.storeSubmission({ email, web, ios, uiux, qa, salesforce })
      .then( results => res.status(200).send('Email address and scores have been stored.') )
      .catch( err => res.status(409).send( err ) );
    } else {
      res.status(409).send({ error: 'Need email in the request query.' });
    }
  },

  read: ( req, res, next ) => {
    const db = app.get('db');
    
    if ( req.query.password === password ) {
      db.getSubmissions().then( results => {
        const downloadable = json2csv({ data: results, fields: fields });
        res.attachment('submissions.csv');
        res.status(200).send(downloadable);
      }).catch( err => console.log('Error fetching emails:', err) );
    } else {
      res.status(401).send({ error: 'Not authorized.' });
    }
  }
};