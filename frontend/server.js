// This file doesn't not go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const next = require('next');
const express = require('express');
const routes = require('./routes');
const appConfig = require('./appConfig');

const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routesHandler = routes.getRequestHandler(app);


app.prepare().then(() => {
  express()
    // Parse cookies from req.headers.cookie to req.cookies
    .use(cookieParser())
    .use(routesHandler)
    .listen(appConfig.PORT);
  console.log('Listening on port: ', appConfig.PORT);
});
