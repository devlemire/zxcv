let api = {
  submissions: '/api/submissions'
};

if ( process.env.NODE_ENV === 'development' ) {
  api.base = 'http://localhost:3000';
} else {
  api.base = 'TBD';
}

export default api;