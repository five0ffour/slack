-- Use for local deployment:
DROP DATABASE IF EXISTS slackmsgs_db;
CREATE DATABASE slackmsgs_db;
USE slackmsgs_db;

-- Use for JawsDB deploymebnt
-- use ici55aem3zzw9fxd;

CREATE TABLE messages (
    id INTEGER AUTO_INCREMENT NOT NULL,
    slack_message VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
