var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server.js');

chai.use(chaiHttp);

describe('GET /', function () {
    var res;

    before(function (done) {
        chai.request(server)
            .get('/')
            .end(function (err, response) {
                if (err) {
                    return done(err);
                }
                res = response;
                done();
            });
    });

    it('should return a 200 status', function (done) {
                expect(res).to.have.status(200);
                done();
    });
    it('should return an html page that displays the syntax');
});

describe('GET /Jan 1, 2010', function () {
    var res;
    before(function (done) {
        chai.request(server)
            .get('/Jan 1, 2010')
            .end(function (err, response) {
                if (err) {
                    return done(err);
                }
                res = response;
                done();
            });
    });

    it('should return a 200 status', function (done) {
        expect(res).to.have.status(200);
        done();
    });

    it('should return a json object', function (done) {
        expect(res).to.be.json;
        done();
    });

    it('should have a natural field that is equal to "January 1, 2010"', function (done) {
        expect(res.body).to.have.property('natural');
        expect(res.body.natural).to.equal("January 1, 2010");
        done();
    });

    it('should have a unix field that is between 1262303999 and 1262390400', function (done) {
        expect(res.body).to.have.property('unix');
        expect(res.body.unix).to.be.above(1262303999);
        expect(res.body.unix).to.be.below(1262390400);
        done();
    });

});


describe('GET /1262347200', function () {
    var res;
    before(function (done) {
        chai.request(server)
            .get('/1262347200')
            .end(function (err, response) {
                if (err) {
                    return done(err);
                }
                res = response;
                done();
            });
    });

    it('should return a 200 status', function (done) {
        expect(res).to.have.status(200);
        done();
    });

    it('should return a json object', function (done) {
        expect(res).to.be.json;
        done();
    });

    it('should have a natural field that is equal to "January 1, 2010"', function (done) {
        expect(res.body).to.have.property('natural');
        expect(res.body.natural).to.equal("January 1, 2010");
        done();
    });

    it('should have a unix field that is between 1262303999 and 1262390400', function (done) {
        expect(res.body).to.have.property('unix');
        expect(res.body.unix).to.be.above(1262303999);
        expect(res.body.unix).to.be.below(1262390400);
        done();
    });
});

describe('GET /Error state', function () {
    var err;
    var res;
    before(function (done) {
        chai.request(server)
            .get('/Error state')
            .end(function (error, response) {
                err = error;
                res = response;
                done();
            });
    });
    
    it('should return a 400 status', function (done) {
        expect(res).to.have.status(400);
        done();
    });

    it('should return a json object', function (done) {
        expect(res).to.be.json;
        done();
    });

    it('should have a natural field with a value of null', function (done) {
        expect(res.body).to.have.property('natural');
        expect(res.body.natural).to.equal(null);
        done();
    });

    it('should have a unix field with a value of null', function (done) {
        expect(res.body).to.have.property('unix');
        expect(res.body.unix).to.equal(null);
        done();
    });
});