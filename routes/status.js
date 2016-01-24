// function doing the actual work for sensor status
// value is read from redis
// in redis (with key = sensorId) there is an entry with the last time
// when a put has been done
// if older than maxInterval... the sensor is no longer sending updat
// and therefore it's KO

// to connect rto redis cache
var Redis = require('ioredis');
var redis = new Redis();

exports.handle_get_sensor_status = function(req, res)
{
   var maxInterval = 5*60*1000; // 5 min.
   
   var key = "sn" + req.params.id;

   console.log("Request: received key = " + key);
   
   // legge da Redis
   // This is the way get from redis has to work
   //
   redis.get(key, function (err, result) {

    res.contentType('application/json');

    if (err)
    {
       res.send({'error':'An error has occurred - ' + err});
    }
    else
    {
       // costruisce l'output
       var now = new Date().getTime();
       var diff = (now - result);
       
       var outcome = "";

       if (diff > maxInterval)
       {
          // too much time passed since last reading received
          outcome = "DOWN";
       }
       else
       {
          outcome = "UP";
       } 
       res.send({id:req.params.id, status:outcome});
    }
  });
}
