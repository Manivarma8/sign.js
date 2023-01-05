const express = require("express")
const app = express();
const https = require("https");
// const request = require("request")
const bodyparser = require("body-parser");



app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(express.json());
app.get("/",function(req, res){
res.sendFile(__dirname + "/sign.html")})


app.post("/", function(req,res){
    const email =req.body.email;
    const second = req.body.password;
    

 const data = {
    members : [
                {
           email_address : email,
           email_type:'text',
            status : "subscribed",
            merge_fields:{
                FNAME:email,
                LNAME:second
            }
        }
    ]
 };

 const varman = JSON.stringify(data);
//  const url =  "https://$API_SERVER.api.mailchimp.com/3.0/lists/7294e3b801";  
const url = "https://us13.api.mailchimp.com/3.0/lists/7294e3b801"

 const options ={
    method : "POST",
    auth: "Manivarman:99a5cbc7909e1983726ba12b14f11fa-us13"
 }
 const request = https.request(url,options, function(response){
    if (response.statusCode === 200){
       
        res.sendFile(__dirname+"/success.html");
       }
    else{
        
        res.sendFile(__dirname+"/failure.html");
        
    
    }


    response.on("data", function(data){
        console.log(JSON.parse(data));
    });

 });
 
 request.write(varman);
 request.end();
})
app.post("/failure",(req, res)=>{
    res.redirect("/")
}) 

// 799a5cbc7909e1983726ba12b14f11fa-us13
// 7294e3b801

app.listen(process.env.PORT||2023,function(){
 console.log("Happy New Year Manivarman");   
})








