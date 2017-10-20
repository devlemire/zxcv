let api = {
  submissions: '/api/submissions'
};

if ( process.env.NODE_ENV === 'development' ) {
  api.base = 'http://localhost:3000';
} else {
  api.base = 'http://104.131.99.159:10005';
}

export default api;