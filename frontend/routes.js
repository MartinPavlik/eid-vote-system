const routes = module.exports = require('next-routes')(); // eslint-disable-line

routes
  .add({ name: 'petition', pattern: '/petition/:petitionId', page: 'petition-detail' });
