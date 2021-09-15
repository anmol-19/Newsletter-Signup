const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { json } = require("body-parser");
const { response } = require("express");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/failure.html",function(req,res){
    res.redirect("/");
})
app.post("/",function(req,res){
    const firstName=req.body.first;
    const lastName=req.body.last;
    const email=req.body.mail;
    console.log(firstName,lastName,Email);
    const data={
        members:[
            {
                email_address:Email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/6d6d8509ab"
    const options={
        method:"POST",
        auth:"Anmolj:a0a45278444c8d8ec03251da53bab2ee-us5"
    }
   // auth:"Anmolj:a0a45278444c8d8ec03251da53bab2ee-us5";
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.listen(process.env.PORT || 3000,function(){
    console.log("server is on port 3000");
})
