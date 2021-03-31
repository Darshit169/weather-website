const request=require("request")

const forecast=(latitude, longitude, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=ec0924820a1f912eef77fe16dba99be3&query="+latitude+","+longitude+"&units=m"
    
    request({ url ,json:true},(error,{body})=>{
   
       if(error)
       {
           callback("Unable to connect weather service!", undefined)
       } 
       else if(body.error)
       {
           callback("unable to find location", undefined)
       }
       else{
           callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degree out.It feels like " + body.current.feelslike + " degree out. The humidity is "+body.current.humidity+"%.")
       }
    })
   }


   module.exports=forecast