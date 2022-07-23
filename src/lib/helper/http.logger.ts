import * as morgan from 'morgan';

import { AppLogger } from './logger';
const appLogger = new AppLogger();

const stream: morgan.StreamOptions = {
  write: (message) => appLogger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

// Build the morgan middleware
export const httpLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length]',
  { stream, skip },
);
