var connection = require("../config/connection.js");
// Helper function for SQL syntax. If we want to pass 3 values into the MySQL query, we will need 3 question marks. This function will loop throught the data and create an array of question marks and then turn it into a string.
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // Loop through the keys and push the key/value pairs to SQL syntax
    for (var key in ob) {
        var value = ob[key];

        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {

            // If a string with spaces, add quotations
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    // Translate the array of strings to a single comma-separated string
    return arr.toString();
}

// Functions for SQL syntax, (1) selectAll, (2) insertOne, (3) updateOne
var orm = {
    selectAll: function(input, cb) {
        var queryString = "SELECT * FROM " + input + ";"
        connection.query(queryString, function(err, result) {
            if(err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        

        connection.query(queryString, vals, function (err, result) {
            console.log('insertOne results', result);
            if (err) {
                console.log('error');
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    deleteOne: function(table, condition, cb){
        var queryString = `DELETE FROM ${table} WHERE ${condition};`;
        connection.query(queryString, function(err, res){
            if (err) throw err;
            cb(res);
        })
    }
};


module.exports = orm;