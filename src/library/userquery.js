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

let commonSelectQuery = function (tableName, aliasName, allData) {
    return new Promise((resolve, reject) => {
        // var query = `SELECT u.user_id, t.task_name, ts.duration from users as u left join tasks as t on t.uid = u.user_id left join timesheet as ts on ts.uid = u.user_id WHERE u.user_id = 2`
        // console.log(allData);
        let mod;
        if (typeof (allData.joins) == "object") {
            let joins = [];
            for (let i of allData.joins) {
                joins.push(i.type + ' join ' + i.table + ' as ' + i.alias + ' on ' + i.on);
            }
            // console.log(allData.selectList.join('').split(','));
            let selectData = allData.selectList.join('').split(',');
            mod = knex.knex((tableName) + ' as ' + aliasName).joinRaw(joins.join(' ')).select(selectData);
        } else if (typeof (allData.joins) == "string") {
            mod = knex.knex((tableName) + ' as ' + aliasName).joinRaw(allData.joins).select(allData.selectList.split(','));
        }
        if (allData.where) {
            mod = mod.whereRaw(allData.where);
        }
        console.log(mod.toQuery(), "final query");
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
    deleteTable,
    commonSelectQuery
}