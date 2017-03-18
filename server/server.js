import koa from 'koa';
import json from 'koa-json';
import mount from 'koa-mount';
import cors from 'koa-cors';
import error from './error';
import routes from './routes';
// import config from '../server.config';

// const version = config.get('version');

const app = koa();

app.use(cors());
app.use(json());
app.use(mount(`/api/v0`, routes.middleware()));
app.use(error);

export default app;
