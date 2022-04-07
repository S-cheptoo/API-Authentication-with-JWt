const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Posts Created..',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    //Mock User
    const user = {
        id: 1, 
        username: 'sandie',
        email: 'sandra@gmail.com'
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    } );
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//verify token
function verifyToken(req, res, next) {
    //get the auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //Set the token 
        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Server running on port 5000'));