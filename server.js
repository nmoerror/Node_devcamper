const http = require('http');

const todos = [
  { id: 1, todo: 'asddasd' },
  { id: 2, todo: 'asddasd' },
  { id: 3, todo: 'asddasd' },
  { id: 4, todo: 'asddasd' },
  { id: 5, todo: 'asddasd' }
];

const server = http.createServer((req, res) => {
  const { headers, url, method } = req;

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: 'Not Found', data: null }));
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Running on port ${PORT}`));
