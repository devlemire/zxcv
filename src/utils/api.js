let api = {
  submissions: '/api/submissions'
};

if ( process.env.NODE_ENV === 'development' ) {
  api.base = 'http://localhost:3000';
} else {
  api.base = `${ window.location.protocol }//${ window.location.hostname }:${ window.location.port }`;
}

export default api;