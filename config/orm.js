var connection = require("../config/connection.js");

var orm = {
    all: function(table, cb){
        let sql = `SELECT * FROM ${table};`;
        connection.query(sql, function(err, res){
            if (err) throw err;
            cb(res);
        });
    },
    specific: function(table, condition, cb){
        let sql = `SELECT * FROM ${table} WHERE ${condition};`;
        connection.query(sql, function(err, res){
            if (err) throw err;
            cb(res);
        });
    },
    create: function(table, cols, vals, cb){
        let sql = `INSERT INTO ${table} ( ${cols.join(',')} ) VALUES ( ${vals.map(x => '?').join(',')} );`
        connection.query(sql, vals, function(err, res){
            if (err) throw err;
            cb(res);
        })
    },
    update: function(table, vals, condition, cb){
        let sql = `UPDATE ${table} SET ${vals} WHERE ${condition};`
        connection.query(sql, vals, function(err, res){
            if (err) throw err;
            cb(res);
        })
    },
    delete: function(table, condition, cb){
        let sql = `DELETE FROM ${table} WHERE ${condition};`;
        connection.query(sql, function(err, res){
            if (err) throw err;
            cb(res);
        })
    }
}

module.exports = orm;