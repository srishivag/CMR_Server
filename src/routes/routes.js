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
router.get('/api/events/:id', wbCtrl.getEventByIdCon);
router.put('/api/events/:id', wbCtrl.updateEventCon);
router.post('/api/tasks', wbCtrl.addNewTaskCon);
router.get('/api/tasks', wbCtrl.getTasksCon);
router.get('/api/task', wbCtrl.getTasksByIdCon);




module.exports = router;