const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
const queryString = require('querystring');

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)

})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
        req.body.updatedAt = Date.now()
    }
    else if (req.method === 'PATCH') {
        req.body.updatedAt = Date.now()
    }
    // Continue to JSON Server router
    next()


})


//custom pagination
router.render = (req, res) => {
    // check GET witch pagination
    // if yes => custom output
    const headers = res.getHeaders();

    const totalCountHeader = headers['x-total-count'];

    if (req.method === 'GET' && totalCountHeader) {
        const queryParams = queryString.parse(req._parsedUrl.query);

        const result = {
            data: res.locals.data,
            pagination: {
                _page: Number.parseInt(queryParams._page) || 1,
                _limit: Number.parseInt(queryParams._limit) || 10,
                _totalRows: Number.parseInt(totalCountHeader)
            }
        };

        return res.jsonp(result)
    }

    res.jsonp(res.locals.data);
}

// Use default router
server.use('/api', router)
server.listen(3000, () => {

    console.log('JSON Server is running');
})