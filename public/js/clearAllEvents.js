$( document ).ready(function() {
    'use strict';

    function clear() {
        $(document).on('click', '#clearEvents', function(){
            $.ajax({
                type: "POST",
                url: "/api/events/clearAllEvents",
                success: function(data){
                    console.log('Clear!!!');
                    //location.href = '/';
                },
            });
        });

        $(document).on('click', '#clearOneEvent', function(){
            $.ajax({
                type: "POST",
                url: "/api/events/clearOneEvent",
                success: function(data){
                    console.log('Clear One!!!');
                    // location.href = '/';
                },
            });
        });
    }

    clear();

});