var userquery = require('../library/userquery.js');
var moment = require('moment');
const Joi = require("joi");
const { start } = require('repl');
/** Insert Events */
module.exports.addNewEventCon = (req, res, next) => {
   // let x = new Date(req.body.scheduled).getTime();
    //console.log(x,'xxxxxxxxx');
    //let dateFormat = moment.utc(x).format();
   // console.log(dateFormat,'dateeeeeeeeee');
    //"scheduled": moment.utc(selectedTime).format("YYYY-MM-DDTHH:mm:ss[Z]")
    let obj={
        "status": req.body.status,
        "whiteboard_task_id": req.body.whiteboard_task_id,
        "description": req.body.description,
        //"scheduled": dateFormat,
        "scheduled": req.body.scheduled,
        "duration_minutes": req.body.duration_minutes,
        "location_clli":req.body.location_clli,
        "location_latitude": req.body.location_latitude,
        "location_longitude": req.body.location_longitude,
        "location_address": req.body.location_address,
        "city": req.body.city,
        "state": req.body.state,
        "site_type":req.body.site_type,
        "contact_name": req.body.contact_name,
        "contact_phone_number": req.body.contact_phone_number,
        "notes": req.body.notes
    }
    // console.log(req.body);
    userquery.insertTable('whiteboard_events', obj).then(resp => {
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
    //let x = new Date(req.query.start_date).getTime();
    //console.log(x,'xxxxxxxxxx');
    //moment.unix(utc).utc().format('YYYY-MM-DD HH:mm:ss');
    let startdate = moment.utc(req.query.start_date).format();
    let enddate = moment.utc(req.query.end_date).format();
    console.log(startdate,'----------------',enddate);
    //if (req.query.status != undefined) {
      //  wherecond = `status IN (${req.query.status})`;
    //}else
    if ((req.query.status != undefined) && (req.query.start_date != undefined && req.query.end_date != undefined)) {
        wherecond = `status IN (${req.query.status}) AND scheduled > '${startdate}' AND scheduled < '${enddate}'`;
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
    console.log("request is", req.params.id);
    userquery.simpleselect('whiteboard_events', '*', `id='${req.params.id}'`).then(resp => {
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
    userquery.updateTableWithWhere('whiteboard_events', `id=${req.params.id}`, req.body).then(resp => {
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


module.exports.jointables = async (req, res, next) => {
    var allData = {
        selectList: ['ts.*,proj.pname,proj.status as pstatus'],
        joins: [
            {
                type: 'left',
                table: 'projects',
                alias: 'proj',
                on: 'proj.pid = ts.pid'
            }
        ],
        where: `uid='${req.body.userid}' ORDER BY task_id DESC limit 5`
    }
    await userquery.commonSelectQuery('tasks', 'ts', allData).then(resp => {
       res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Task By Id read successful',
            data: resp
        });

    }).catch(err => {
        console.log(err, 'errrrrrrr');
        res.status(200).send(err);
    })
}