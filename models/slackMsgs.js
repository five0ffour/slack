// slackMsgs.js - business logic for our app (CRUD) 
//            -  calls the ORM with the appropriate interfaces (examples shown below)
var orm = require("../config/orm.js");

var slackMessages = {

    // ALL - no parms needed
    all: (cb) => {
        orm.all("messages", (res) => {
            cb(res);
        });
    },

    // INSERT
    // var columns = [ "slack_message"];
    // var values = [ "my message" ];
    insert: (columns, values, cb) => {
        orm.insert("messages", columns, values, (res) => {
            cb(res);
        });
    },

    // POST to Slack
    // https://hooks.slack.com/services/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
    // { "text" : "Hello, World!"}
    postSlack: (channel, value, cb) => {
        var axios = require('axios');
        var queryURLString = "";

        // Build the url string with the api key and movie title
        queryURLString = "https://hooks.slack.com/services/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";

        axios.post(queryURLString, {
                text: value,
            })
            .then(function (response) {
                console.log("Success posting to slack random channel");
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error: ", error.message);
                }
                console.log(error.config);
            });
    }
};

module.exports = slackMessages;