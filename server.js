const http = require("http");
let requestCount = 0;
const server = http.createServer((request, responce) => {
  requestCount++;
  responce.write("IT-camasutra" + requestCount);
  responce.end();
});

server.listen(3003);
