const express = require('express');
const router = express.Router();
const eventsServices = require('../services/events.services');

router.get('/', function(req, res, next) {
    console.log('dqwdqw');
    res.render('pratsya', { title: 'God Mode'});
});

module.exports = router;