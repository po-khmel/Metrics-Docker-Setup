const http = require('http');
const { exec } = require('child_process');

const PORT = process.env['PORT'] || 9101;

http.createServer((req, resp) => {
  resp.writeHead(200, {'content-type': 'text/plain; version=0.0.4; charset=utf-8'});
  const start = new Date();
  exec('./pids.sh', {
    timeout: 4000,
    killSignal: 9,
  }, (err, stdout, stderr) => {
    const duration = (new Date() - start) / 1000.0;
    resp.write(`node_pids_scrape_duration ${duration}\n`);
    if (err) {
      resp.end();
      console.error(err);
      if (stderr) console.warn(stderr);
    } else {
      resp.end(stdout);
    }
  });
}).listen(PORT);

console.info(`Listening on :${PORT}...`);

process.once('SIGTERM', () => process.exit(0));
process.once('SIGINT', () => process.exit(0));