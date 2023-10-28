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

    res.end (`
    Path: ${parsedReq.path}
    Trimmed Path: ${parsedReq.trimmedPath}
    Method: ${parsedReq.method}
    Headers: \n${JSON.stringify(parsedReq.headers, null, 2)}
    Query Object: \n${JSON.stringify(parsedReq.queryStringObject, null, 2)}
    `)
}); 
server.listen(3000, () => console.log('Listening on port 3000...'));
