$( document ).ready(function() {
    'use strict';

    const TemplateEvents = {

        showInitScreen() {
            $("#container").html('');
            App.$container.appendChild(App.$templateHelloScreen.content.cloneNode(true));

            App.doTextFit('#title');

            if ( App.eventsLength !== null ) {
                $('#buttonEvents span').text(' ' + App.eventsLength);
            }
        },

        showAddEventScreen() {
            $("#container").html('');
            App.$container.appendChild(App.$templateAddEventScreen.content.cloneNode(true));
            $(function () {
                $('#datetimepicker2').datetimepicker({
                    format: 'DD/MM/YYYY LT'
                });
            });

        },

        showEventsScreen() {
            $("#container").html('');
            App.$container.appendChild(App.$templateShowEventsScreen.content.cloneNode(true));
        }
    }

    const App = {

        events: null,
        eventsLength: null,
        selectedEvent: {
            selectId: null,
            selectElem: null
        },

        init() {

            App.cacheElements();
            TemplateEvents.showInitScreen();
            App.bindEvents();
        },

        cacheElements() {
            App.$doc = $(document);
            // App.$container = $('#container');
            App.$container = document.querySelector("#container");


            // Buttons
            App.buttonEvents = $('#buttonEvents');
            App.$buttonAdd = $('#buttonAdd');

            // Templates

            App.$templateHelloScreen = document.querySelector("#hello-screen-template");
            App.$templateAddEventScreen = document.querySelector("#addEvent-screen-template");
            App.$templateShowEventsScreen = document.querySelector("#showEvents-screen-template");


        },

        bindEvents() {
            App.$doc.on('click', '#buttonEvents', App.getEvents);
            App.$doc.on('click', '#buttonAdd', TemplateEvents.showAddEventScreen);

            App.$doc.on('click', '.willButton', App.selectEvent);
            App.$doc.on('click', '#willButtonSave', App.saveWill);

            App.$doc.on('click', '#createEventButton', App.saveNewEvent);
            App.$doc.on('click', '#hrenVamButton', TemplateEvents.showInitScreen);

            App.$doc.on('click', '#backButton', TemplateEvents.showInitScreen);
        },

        getEvents() {
            $.ajax({
                type: "POST",
                url: "/api/events/getEvents",
                success: function(data){
                    if (JSON.parse(data).length !== 0 ) {
                        App.showEvents(JSON.parse(data));
                    }
                }
            });
        },

        showEvents(events) {
            TemplateEvents.showEventsScreen();

            App.events = events;

            App.events.forEach(function(item, index){
                let eventContainer = '';
                eventContainer += '<tr id='+ item.idEvent +'>';
                eventContainer += '<td class="eventName">' + item.eventName + '</td>';
                eventContainer += '<td>' + item.nameBos + '</td>';
                eventContainer += '<td class="eventPlace">' + item.eventPlace + '</td>';
                eventContainer += '<td class="datetime">' + item.eventDateTime + '</td>';
                eventContainer += '<td class="members">' + item.members + '</td>';
                eventContainer += '<td><button type="button" class="btn btn-primary btn-md willButton" data-toggle="modal" data-target="#myModal">Буду!</button></td>';
                eventContainer += '</tr>';

                $('#eventsList').prepend(eventContainer);
            });

        },

        saveNewEvent() {
            let data = {
                idEvent: App.getId(10),
                eventName: $('#example-partyName-input').val() || 'friendly party',
                nameBos: $('#example-nameBos-input').val() || 'какой-то парень',
                eventPlace: $('#example-place-input').val() || 'рыгаловка тры дубка',
                eventDateTime: $('#example-datetime-input').val() || 'когда-нибудь',
                members: ''
            };

            data.members += data.nameBos;

            $.ajax({
                type: "POST",
                url: "/api/events/createEvent",
                data: data,
                success: function(data){
                    console.log("Данные успешно записались!");
                    App.saveLength(data);
                    TemplateEvents.showInitScreen();
                },
            });

        },

        saveLength(eventsLength) {
          App.eventsLength = eventsLength;
        },

        selectEvent(){
            App.selectedEvent.selectElem = $(this).parent().parent();
            App.selectedEvent.selectId = $(this).parent().parent().attr("id");
        },

        saveWill() {
            if ( (App.selectedEvent.selectId !== 0) && (App.selectedEvent.selectElem !== 0)) {
                let newMember = $('#example-newMember-input').val() || 'какой-то парень';
                let members = App.selectedEvent.selectElem.children(".members").text();
                members = members + ', ' + newMember;
                App.selectedEvent.selectElem.children(".members").text(members);

                App.events.forEach(function(item, index) {
                    if ( item.idEvent === App.selectedEvent.selectId ) {
                        App.events[index].members = members;
                    }
                });

                $.ajax({
                    type: "POST",
                    url: "/api/events/addNewMember",
                    data: {
                        newMembers: members,
                        eventId: App.selectedEvent.selectId
                    },
                    success: function(data){
                        console.log("Вы идете! Вы дали слово, и оно уже в реестре! ");
                    },
                });
            }
        },

        getId(length) {
            const  chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

            if (! length) {
                length = Math.floor(Math.random() * chars.length);
            }

            let str = "";
            for (let i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        },

        doTextFit: function(el) {
            textFit(
                $(el)[0], {
                    alignHoriz: true,
                    alignVert: false,
                    widthOnly: true,
                    reProcess: true,
                    maxFontSize: 300
                }
            );
        }

    }

    App.init();
});

