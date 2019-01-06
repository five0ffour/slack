// public/js/slackmsg.js - front click event handling logic for User Inteface 

// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function () {

    // Add - form entry POST event to add item to database and slack
    $("#add-btn").on("click", function (event) {

        event.preventDefault();

        // Validation
        var msg = $('input[name=message]').val().trim();

        var slackMessage = {
            message: msg,
        }

        // Post message to the database and then slack it out
        // Currently the url hard codes to "Galarneau - Random" channel 
        var url = "https://hooks.slack.com/services/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";
        var ajaxDBCall = $.ajax({
                type: "POST",
                data: slackMessage,
                url: "/api/msg/"
            }),
            ajaxSlackCall = ajaxDBCall.then(function (data) {
                // Post to database
                return $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    processData: false,
                    data: JSON.stringify({
                        text: slackMessage.message
                    })
                });
            });

        // Reload the page to refresh the list on the screen with the new item
        ajaxSlackCall.done(function (DBResponseData) {
            console.log("Slack call successful");
        }).fail(function () {
            console.log("Slack call fail");
        }).always(function () {
            location.reload();
        });
    });
});