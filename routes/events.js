var express = require('express');
var router = express.Router();
const eventsServices = require('../services/events.services');

router.post('/getEvents/', function(req, res) {
    let events = JSON.stringify(eventsServices(req, res).getEventsNum());
    res.end(events);
});


router.post('/createEvent', function(req, res) {
    eventsServices(req, res).addNewEvent();
    let eventsLength = '' + eventsServices(req, res).getEventsNum().length;
    res.end(eventsLength);
});

module.exports = router;
