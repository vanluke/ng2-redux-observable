import server from './server';
import config from '../server.config';

const port = config.get('port');
const hostname = config.get('host');

server.listen(port, hostname, function() {
  console.log(`server listening on ${port}`);
});
