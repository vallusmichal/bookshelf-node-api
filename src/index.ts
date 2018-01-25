import * as http from 'http';
import * as debug from 'debug';

import app from './App';

debug('ts-express:server');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);