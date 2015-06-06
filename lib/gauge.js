var request = require("request")
var Promise = require("promise")
var S = require('string');

// 1. http://waterdata.usgs.gov/usa/nwis/uv?07164500
// #WaterInTheRiver means more than 1' at the gauge, with 2' being a nice looking river.


gauge = function(){
return new Promise(function(resolve, reject){
  
  request('http://waterdata.usgs.gov/usa/nwis/uv?07164500', function (error, response, body) {

    if (!error && response.statusCode == 200) {
    

      //Most recent instantaneous value: 7.78   06-06-2015  16:30 CDT 
 
      var level = S(body).between("Most recent instantaneous value: "," ")
      
      resolve(level > 2 )
    
    }else{
      reject(error);
    }
  })
  
});
};
module.exports = gauge
