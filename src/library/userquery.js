require('dotenv').config();
const Promise = require('bluebird');
const {
    raw,
    objectiond
} = require('objection');
const request = require('request');
var knex = require('../config/knex.js');

// CRUD Operation Methods
let insertTable = function (tableName, data) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).insert(data);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let insertRawTable = function (Model, data) {
    return new Promise((resolve, reject) => {
        let que = Model.query().insert(data).toString();
        let mod = Model.raw(que);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}


let simpleselect = function (tableName, columns, whereCond) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select(columns).from(tableName);
        if (whereCond) {
            mod = mod.whereRaw(whereCond);
        }
        console.log(mod.toQuery(), "final query");
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}


let updateTable = function (tableName, whereCond, updateCond, whereColumn, updateColumn) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).where(whereCond).update(updateCond, [whereColumn, updateColumn]);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let updateTableWithWhere = function (tableName, whereCond, updateColumn) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).whereRaw(whereCond).update(updateColumn);
        console.log(mod.toQuery(), "final query111111111111");
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let deleteTable = function (tableName, columnName, columnValue) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).where(columnName, columnValue).del();
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}


module.exports = {
    insertTable,
    insertRawTable,
    simpleselect,
    updateTable,
    updateTableWithWhere,
    deleteTable
}