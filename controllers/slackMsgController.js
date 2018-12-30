// slackMsgController.js - registers the HTTP endpoints with the express router:
//     /                   - GET - return all burgers from the database
//     /api/burgers/:id    - DELETE - removes a specific burger from the database
//     /api/burgers        - POST - add a burger to the dataase
//   (See README.md for parameter details)

var express = require("express");
var router = express.Router();

// Import the model (slack.js) to use its database functions.
var slackMsgs = require("../models/slackMsgs.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    console.log("GET Called");
    slackMsgs.all((data) => {
        var slackMsgData = {
            messages: data
        };
        console.log("--------- GET ----------");
        console.log(slackMsgData);
        res.render("index", slackMsgData);
    });
});

router.post("/api/msg/", function (req, res) {
    console.log("POST to database Called ");

    // Post Message to MySQL
    var columns = ["slack_message"];
    var values = [ req.body.message ];
    console.log("values = [" + values + "]");
    slackMsgs.insert(columns, values, (slackMsgData) => {
        console.log("--------- POST to Database ----------");
        res.json({ id: slackMsgData.insertId });
    });
});

router.post("/api/slack/", function (req, res) {
    console.log("POST to slack Called ");

    // Post Message to Slack
    // https://hooks.slack.com/services/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
    slackMsgs.postSlack("random",req.body.message, (data) => {
        console.log("------------ POST to Slack -------------");
        res.status(200).json({status:"ok"});
    });

});

// Export routes for server.js to use.
module.exports = router;