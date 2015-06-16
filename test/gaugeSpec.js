var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var nock = require("nock");

var should = chai.should();
chai.use(chaiAsPromised);

var gauge = require("../lib/gauge.js");


describe("Gauge", function() {
  describe("gauge()", function() {
    it("should return gauge level", function() {
      var gaugePage = nock('http://waterdata.usgs.gov')
                          .get('/usa/nwis/uv?07164500')
                          .replyWithFile(200, __dirname + '/replies/gauge3.html');

      return gauge().should.eventually.equal(8.9);
    });
  });
});
