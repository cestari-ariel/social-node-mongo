const express = require('express');
const router = express.Router();

const home = require('../controller/home');
const image = require('../controller/image');

module.exports = app => {
    router.get('/', home.index);
    
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/image', image.coment);
    router.delete('/images/:image_id', image.delete);
    
    app.use(router);
}