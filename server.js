const http = require('http');

const todos = [
  { id: 1, todo: 'asddasd' },
  { id: 2, todo: 'asddasd' },
  { id: 3, todo: 'asddasd' },
  { id: 4, todo: 'asddasd' },
  { id: 5, todo: 'asddasd' }
];

const server = http.createServer((req, res) => {
  const { url, method } = req;
  let body = [];

  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();

      let status = 404;

      response = {
        success: false,
        data: null
      };

      if (method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body);
        if (!id || !text) {
          status = 400;
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Running on port ${PORT}`));
