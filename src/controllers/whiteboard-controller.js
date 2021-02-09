var userquery = require('../library/userquery.js');

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

/** Insert Tasks */
module.exports.addNewEventCon = (req, res, next) => {
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
module.exports.getEvents = (req, res, next) => {
    userquery.simpleselect('whiteboard_events', '*', null).then(resp => {
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

module.exports.getEventSearchCon = (req, res, next) => {
    console.log("request is", req.body);
    let wherecond;
    if (req.body.status != undefined) {
        wherecond = `status = '${req.body.status}'`;
    } else if (req.body.status != undefined || req.body.start_date != undefined) {
        wherecond = `status = '${req.body.status}' AND start_date = '${req.body.start_date}'`;
    } else if (req.body.status != undefined || req.body.start_date != undefined || req.body.end_date != undefined) {
        wherecond = `status = '${req.body.status}' AND start_date = '${req.body.start_date}' AND end_date = '${req.body.end_date}'`;
    } 
    // else if (req.body.start_date != undefined || req.body.end_date != undefined) {
    //     wherecond = `start_date = '${req.body.start_date}' AND end_date = '${req.body.end_date}'`;
    // }
    userquery.simpleselect('whiteboard_events', '*', wherecond).then(resp => {
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


/** Edit Events */
module.exports.updateEventCon = (req, res, next) => {
    let obj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    userquery.updateTableWithWhere('whiteboard_events', `id=${req.body.id}`, obj).then(resp => {
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