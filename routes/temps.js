// function doing the actual work for temps
// value is read from redis

var Redis = require('ioredis');
var redis = new Redis();

exports.handle_get_temp = function(req, res)
{
  var key = "temps/" + req.params.id;

  console.log("Request: received key = " + key);

  //
  // This is the way get from redis has to work
  //
  redis.get(key, function (err, result) {

    res.contentType('application/json');

    if (err)
    {
       res.send({'error':'An error has occurred - ' + err});
    } else 
    {    
       res.send({id:req.params.id, temp:result});
    }
  });
}

exports.handle_get_all_temp = function(req, res)
{
   res.contentType('application/json');

   res.send({id:"all_temps", temp:"OK"});
}

