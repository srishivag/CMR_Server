const assert = require('assert');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../src/server.js');

describe('Express server test', () => {
    describe('Whiteboard Event module test', () => {
        it('it should all the white board events', () => {
            chai.request(server)
                .get('/api/events')
                .end(function (err, res) {
                    expect(res).to.have.status(200);    // <= Test completes before this runs
                });
        });

        it('should post', () => {
            chai.request(server)
                .post('/api/events')
                .send(
                    {
                        "status": "Complete",
                        "whiteboard_task_id": "2",
                        "description": "unit testing",
                        "scheduled": "2021-02-09",
                        "duration_minutes": "55",
                        "location_latitude": "120.20",
                        "location_longitude": "140.52",
                        "location_address": "iit hyd",
                        "city": "hyd",
                        "state": "telangana",
                        "contact_name": "sai",
                        "contact_phone_number": "5555555555",
                        "notes": "adsfasdf"
                    }
                )
                .end((err, res) => {
                    assert.equal(res.body.statusCode, 200);
                    assert.equal(typeof (res.body.data), 'object');
                });

        });
    });
});



// {
// 	"status":"active",
// 	"whiteboard_task_id":"1",
// 	"description":"abcd1",
// 	"scheduled":"2021-02-09 15:31:01",
// 	"duration_minutes":"44",
// 	"location_latitude":"120",
// 	"location_longitude":"140",
// 	"location_address":"jntu",
// 	"city":"hyd",
// 	"state":"telangana",
// 	"contact_name":"sai",
// 	"contact_phone_number":"99999999999",
// 	"notes":"adsfasdf"
// }