var request = require("request")
var Promise = require("promise")

// 1. http://waterdata.usgs.gov/usa/nwis/uv?07164500
// #WaterInTheRiver means more than 1' at the gauge, with 2' being a nice looking river.

gauge = function(){
return new Promise(function(resolve, reject){
  
  request('http://waterdata.usgs.gov/usa/nwis/uv?07164500', function (error, response, body) {

    if (!error && response.statusCode == 200) {
        var valueRE = /value: (\d+\.\d+)/;
        var level = parseFloat(valueRE.exec(body)[1]);
      resolve(level)
    }else{
      reject(error);
    }
  })
  
});
};
module.exports = gauge
