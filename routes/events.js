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

router.post('/addNewMember', function(req, res) {
    eventsServices(req, res).addNewMember();
    res.end();
});

router.post('/clearAllEvents', function(req, res) {
    eventsServices(req, res).clearAllEvents();
    res.end();
});

router.post('/clearOneEvent', function(req, res) {
    eventsServices(req, res).clearOneEvent();
    res.end();
});

module.exports = router;
