const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secreatKey = "sjdncdncbhdbnjc";

app.get("/", (req, res) => {
    res.json({
        message: "a simple api"
    })
})

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "anish",
        email: "anish@gmail.com"
    }

    jwt.sign({user}, secreatKey, { expiresIn: '300s'}, (err, token) => {
        res.json({
            token
        })
    })
    
})

app.post("/profile", verifyToken, (req,res) => {
    jwt.verify(req.token, secreatKey, (err, authData) => {
        if(err){
            res.json({result: "invalid token!"});
        }else{
            res.json({
                message: "profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        res.send({
            result: 'Token is not valid'
        })
    }
}

app.listen(5000, () => {
    console.log("app is running on 5000 port");
})