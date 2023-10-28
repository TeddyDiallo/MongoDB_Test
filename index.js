const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    const parsedReq = {};

    parsedReq.parsedUrl = url.parse(req.url, true);
    parsedReq.path = parsedReq.parsedUrl.pathname;
    parsedReq.trimmedPath = parsedReq.path.replace(/^\/+|\/+$/g, '');
    parsedReq.method = req.method.toLowerCase();
    parsedReq.headers = req.headers;
    parsedReq.queryStringObject = parsedReq.parsedUrl.query;

    let body = [];

    req.on('data', (chunck) => {
        body.push(chunck);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();
        parsedReq.body = body;

        res.end (parsedReq.body);
    });

}); 
server.listen(3000, () => console.log('Listening on port 3000...'));
