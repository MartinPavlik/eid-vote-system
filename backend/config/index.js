import path from 'path';
import { _extend } from 'util';
import development from './env/development';

const defaults = {
  root: path.normalize(`${__dirname}/..`),
};

export default {
  development: _extend(development, defaults),
}[process.env.NODE_ENV || 'development'];
