var connection = require("../config/connection.js");

// Object Relational Mapper - SQL Templates and calls
const orm = {
    all : function (table, cb) {
        var queryStr = "SELECT *  FROM " + table;
        console.log(queryStr);
        connection.query(queryStr, function(err,result) {
            if (err) throw err; 
            cb(result);
        });
    },

    
    insert : function (table, columns, values, cb) {
      var queryStr = "INSERT INTO " + table +
                      " ( " + columns.toString() + " ) " +
                      "VALUES (" + 
                      printQuestionMarks(values.length) +
                      ") ";
      console.log(queryStr);
      connection.query(queryStr, values, function(err,result) {
          if (err) throw err; 
          cb(result);
      });
  },
}

//---------------------------------
// Helper function for SQL syntax.
//---------------------------------

// HELPER FUNCTION FOR PREPARED STATEMETNS WITH VALUES( ?, ...) 
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// HELPER FUNCTION FOR PREPARED STATEMENTS WITH WHERE CONDITONS: ? AND ? AND....
// Let's say we want to pass 3 values into the mySQL where clause query.
// The helper function loops through and creates an array of question marks - ["?", "AND ?", "AND ?"] - and turns it into a string.
// ["?", "AND ?", "AND ?"].toString().replace(",","") => "? AND ? AND ?";
function printQuestionMarksConditional(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
        if (i === 0) {
            arr.push(" ? ");
        } else {
            arr.push(" AND ? ");
        }
    }

    var resultStr = arr.toString().replace(/,/g, '');
  
    return resultStr;
  }

  
  // Helper function to convert object {key:value} pairs to SQL "key = value" syntax
  // Converts [ { key1 : value1 }, { key2 : value2 }... ]  to ["key1=value1", "key2=value2", "..."]
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

module.exports = orm;

