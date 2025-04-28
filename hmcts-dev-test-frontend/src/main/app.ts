import * as path from 'path';
import { glob } from 'glob';

import mountHomeRoute from './routes/home';
import mountCaseRoute from './routes/cases';


import { HTTPError } from './HttpError';
import { Nunjucks } from './modules/nunjucks';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import favicon from 'serve-favicon';

const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

new Nunjucks(developmentMode).enableFor(app);

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

mountHomeRoute(app);
mountCaseRoute(app);


const routesDir = path.join(__dirname, 'routes');
glob.sync(path.join(routesDir, '**/*.+(ts|js)'), { absolute: true })
  .forEach((file) => {
    const mod = require(file);
    if (mod.default) mod.default(app);
    else console.warn(`no default export in ${file}`);
  });

setupDev(app, developmentMode);

// error handler
app.use((err: HTTPError, req: express.Request, res: express.Response,  next: express.NextFunction) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
