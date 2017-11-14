const querystring = require('querystring');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data/events.json');
const db = low(adapter);

function eventsServices(req, res) {

    return {
        addNewEvent() {
            db.defaults({ events: [] })
                .write();

            db.get('events')
                .push(req.body)
                .write();

            console.log(db.get('events').value());

        },

        addNewMember() {

                db.get('events')
                    .find({ idEvent: req.body.eventId })
                    .assign({ members: req.body.newMembers })
                    .write()

        },

        clearAllEvents() {
            db.set('events', []).write();
        },

        clearOneEvent() {

            let events = db.get('events').value();
            let length = events.length;
            let delId = events[length-1].idEvent;

            db.get('events')
                .remove({ idEvent: delId })
                .write();
        },

        getEventsNum() {
            return db.get('events').value();
        }
    }

}

module.exports = eventsServices;