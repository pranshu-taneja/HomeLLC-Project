const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken') 
const mongoose = require('mongoose')
const userModel = require('./models/user.model')        //now that userdata exported will gives all its power that is the model created can be used by usermodel which has passed on to all power (so usermodel has the schema now so it do CRUD operation with the connected database of mongodb)
//Here usermodel is the power which is made to interact with the mongodb database. You can use it for CRUD operations
const port = 5000
require('dotenv').config()


app.use(cors());        //kind of bypasses same origin policy and let the browser use cross origin policy (for all domains in this code but you can set it up for specific domains only) (used by browser due to malicious websites trying access to other websites) 
app.use(express.json());        //middleware to convert the coming json payloads (json objects) to json data (used by req.body)

app.use(function (req, res, next) {                         //its to enable cors basically without this you won't get responses 
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  

try{
    // mongodb://localhost:27017/userdata
    mongoose.connect(`mongodb+srv://Pranshu:${process.env.MongoDbkey}@cluster0.fnurcsz.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
        console.log("mongoose connected successfully")
    })
}
catch(err){
    console.log(`There is some error while connecting to mongodb: ${err}`)
}


app.get('/', (req, res) => res.send('Hello From the server side!'))


function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } 
    catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

  
app.get('/api/username', verifyToken, async (req, res) => {
try {
    const email_token = req.headers['x-access-token'];
    const decoded = jwt.verify(email_token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email});
    res.json({ status: '200', firstname: user.firstname, lastname: user.lastname });
} catch (err) {
    res.status(500).json({ status: '500', err });
}
});
  
//login route for login user
app.post('/api/login', async(req,res)=>{       //here the req is provided by frontend and which contains the whole data like headers, body, content-type etc 
    // console.log(req.body);                  //here we are getting the req.body(data passed by the frontend to the server or api so that it can be stored on database or maybe for login purpose) 

    //matching email so that duplicated user can be ignored
    const user = await userModel.findOne({              //this will find the value in the database and return error if there does a duplicate email exists !!
        email:req.body.email,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign(     //signing a token if user exists
            {
                email:user.email,
                password:user.password
            },
            process.env.JWT_SECRET,
        )
        res.json({status:'200', user:token})
    }
    else{
        res.json({status:'409', error:'Invalid Credentials'})
    }
    //need to enter into login using jwt token after that verification
})

//register route for registering users
app.post('/api/register', async(req,res)=>{
    // console.log(req.body);                  //here we are getting the req.body(data passed by the frontend to the server or api so that it can be stored on database or maybe for login purpose) 

    const user = await userModel.findOne({              //this will find the value in the database and return error if there does a duplicate email exists !!
        email:req.body.email
    })

    if(user){
        res.json({status:'405', error:'Email/User already exists!!'})
    }
    else{
        try{                                //using try catch so that exception can get caught (use try catch while using api's) 
            await userModel.create({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password
            })
            res.json({status:'200', response:'Successfully Registered!!'});
        }
        catch(err){
            console.log(err);
            res.json({status:'error', error:`${err}`})
        }
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))