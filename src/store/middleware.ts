import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import {createLogger} from 'redux-logger';

const middleware: any = [];

if (process.env.NODE_ENV === 'development') {
  // middleware.push(createLogger());
}

middleware.push(thunk);
middleware.push(promise);

export default middleware;
