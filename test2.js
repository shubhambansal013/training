var async = require ("async");
async.series([function (callback){
  console.log("this is first");
  callback(null,1);
},
function(callback){
  console.log("this is the second");
  callback(null,2);
}],
function(error,results){
  if(error) throw error;
  console.log(results);
});
