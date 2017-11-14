var express = require('express');
var router = express.Router();
const eventsServices = require('../services/events.services');

router.get('/', function(req, res, next) {
  let eventsLength = eventsServices(req, res).getEventsNum().length;
  res.render('index', { title: 'friendly time', eventsLength: eventsLength });
  // console.log(eventsServices(req, res).getEventsNum());
});

module.exports = router;
