const express = require('express');
var router = express.Router();
var wbCtrl = require('../controllers/whiteboard-controller.js');


// Server routes
router.get('/server', (req, res, next) => {
    console.log("API works!");
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

router.post('/api/events', wbCtrl.addNewEventCon);
router.get('/api/events', wbCtrl.getEvents);
router.post('/api/events/id', wbCtrl.getEventByIdCon);
router.post('/api/events/update', wbCtrl.updateEventCon);
router.post('/api/tasks', wbCtrl.addNewTaskCon);

//router.get('/api/events/search', wbCtrl.getEventSearchCon);


router.get('/api/tasks', wbCtrl.getTasksCon);
router.get('/api/task', wbCtrl.getTasksByIdCon);




module.exports = router;