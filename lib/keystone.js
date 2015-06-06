cheerio = require('cheerio')
request = require('request')
Promise = require('promise')

var KEYSTONEURL = "http://www.swt-wc.usace.army.mil/webdata/gagedata/KEYO2.current.html";
var STARTROW = 10;
var columns = ['date', 'time', 'precip', 'precip2', 'elevation', 'storage', 'twElevation', 'inflow', 'release', 'airTemp', 'windDir', 'windSpeed', 'relHumid', 'solarRad', 'Volts', 'batteryLoad'];
var fakeIt = false;
var getKeystone = function(){
return new Promise(function(resolve, reject){
 request(KEYSTONEURL, function(err, res, body){
   if(err){
     reject(err);
     return;
   }
   var $ = cheerio.load(body);
   var text = $('pre').text()
   var lines = text.split('\n');
   var returnLine1 = lines[STARTROW];
   var returnLine1 = returnLine1.split('\r')[0];
   var returnLine2 = lines[STARTROW+1];
   var returnLine2 = returnLine2.split('\r')[0];
   var obj = returnLine1.split(' ');
   var parsedObj1 = {};
   var parseIndex = 0;
   obj.forEach(function(val, index, array){
     if(val != ''){
       if(fakeIt){
         if(parseIndex==6 || parseIndex==8){
           val = 1000;
         }
       }
       parsedObj1[columns[parseIndex]]=val;
       parseIndex++;
     }
   })
   var obj = returnLine2.split(' ');
   var parsedObj2 = {};
   parseIndex = 0;
   obj.forEach(function(val, index, array){
     if(val != ''){
       if(fakeIt){
         if(parseIndex==8){
           val = 100;
         }
       }
       parsedObj2[columns[parseIndex]]=val;
       parseIndex++;
     }
   })
   var returnObj = {flowing:false, current: parsedObj1, prev: parsedObj2}
   if(parsedObj1.twElevation > parsedObj2.twElevation){
     if(parsedObj1.release != '----' && parsedObj2.release != '----' && parsedObj1.release >  parsedObj2.release){
       returnObj.rising = true;
     }else{
       if(parsedObj1.release != '----'){
         returnObj.rising = true;
       }      
     }
   }
   resolve(returnObj);
 }); 
});
}

module.exports = getKeystone
