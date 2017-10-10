let api = {};

if ( process.env.NODE_ENV === 'development' ) {
  api.emails.get = 'http://localhost:3000/api/emails';
} else {
  api.emails.get = 'TBD';
}

export default api;