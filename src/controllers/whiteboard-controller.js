var userquery = require('../library/userquery.js');
var moment = require('moment');

/** Insert Events */
module.exports.addNewEventCon = (req, res, next) => {
    console.log(req.body);
    userquery.insertTable('whiteboard_events', req.body).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data inserted successfully',
            data: resp
        });
    }).catch(err => {
        console.log(err, 'err');
        res.status(200).send(err);
    })
}


/** Get All Events with search option*/
module.exports.getEvents = (req, res, next) => {
    let wherecond;
    let startdate = moment.utc(req.query.start_date).format('YYYY-MM-DD');
    let enddate = moment.utc(req.query.end_date).format('YYYY-MM-DD');
    if (req.query.status != undefined) {
        wherecond = `status IN (${req.query.status})`;
    }else if (req.query.status != undefined && req.query.start_date != undefined && req.query.end_date != undefined) {
        wherecond = `status IN (${req.query.status}) AND scheduled > '${startdate}' scheduled < '${enddate}'`;
    }else if (req.query.start_date != undefined && req.query.end_date != undefined) {
        wherecond = `scheduled > '${startdate}' AND scheduled < '${enddate}'`;
    }else {
        wherecond = null;
    }
    console.log(wherecond,'#####')
    userquery.simpleselect('whiteboard_events', '*', wherecond).then(resp => {
        console.log(resp, 'res');
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'whiteboard events read successful',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })

}


/** Get All Events by id*/
module.exports.getEventByIdCon = (req, res, next) => {
    console.log("request is", req.body);
    userquery.simpleselect('whiteboard_events', '*', `id='${req.body.id}'`).then(resp => {
        console.log('get user by id', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',

            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}



/** Update Events */
module.exports.updateEventCon = (req, res, next) => {
    // let obj = {
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password
    // }
    userquery.updateTableWithWhere('whiteboard_events', `id=${req.query.id}`, req.body).then(resp => {
        console.log("event details updated successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'event details updated successful',
            data: resp
        });
    }).catch(err => {
        console.log("Error while updating event details", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while updating event details',
            data: err
        });
    })
}



/** Insert Tasks */
module.exports.addNewTaskCon = (req, res, next) => {
    console.log(req.body);
    userquery.insertTable('whiteboard_tasks', req.body).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data inserted successfully',
            data: resp
        });
    }).catch(err => {
        console.log(err, 'err');
        res.status(200).send(err);
    })
}

/** Get All Events */
module.exports.getTasksCon = (req, res, next) => {
    userquery.simpleselect('whiteboard_tasks', '*', null).then(resp => {
       // console.log(resp, 'res');
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'whiteboard events read successful',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })

}

module.exports.getTasksByIdCon = (req, res, next) => {
    console.log("request is ------------", req.query);
    userquery.simpleselect('whiteboard_tasks', '*', `id=${req.query.id}`).then(resp => {
        console.log('get user by id', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}