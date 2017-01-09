var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../server.js');

describe('Server', function () {
    // JSON object format: {'natural': "String", 'unix': number}
    it('Should return a JSON object with the natural date and unix timestamp if given a natural language date');
    it('Should return a JSON object with the natural date and unix timestamp if given accept a unix timestamp');
    it('Should return a JSON object with null fields if given invalid input');
});