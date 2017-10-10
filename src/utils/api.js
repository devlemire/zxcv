let api = {
  emails: '/api/emails'
};

if ( process.env.NODE_ENV === 'development' ) {
  api.base = 'http://localhost:3000';
} else {
  api.base = 'TBD';
}

export default api;