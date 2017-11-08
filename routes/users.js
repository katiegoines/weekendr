const  
    express = require('express'),
    usersRouter = new express.Router(),
    usersCtrl = require('../controllers/users.js'),
    searchesCtrl = require('../controllers/searches.js'),
    verifyToken = require('../serverAuth.js').verifyToken

usersRouter.route('/')
    .get(usersCtrl.index)
    .post(usersCtrl.create)

usersRouter.post('/authenticate', usersCtrl.authenticate)

usersRouter.use(verifyToken)
usersRouter.route('/:id')
    .get(usersCtrl.show)
    .patch(usersCtrl.update)
    .delete(usersCtrl.destroy)

// Searches
usersRouter.route('/:id/searches')
    .get(searchesCtrl.index)
    .post(searchesCtrl.create)

usersRouter.route('/:id/searches/:searchid')
    .delete(searchesCtrl.destroy)

module.exports = usersRouter