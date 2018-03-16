var mongoose = require('mongoose');
var User     = require('../models/user');
//  REQUIRE JSON WEB TOKEN 
var jwt = require('jsonwebtoken');
var secret  = 'secret';

module.exports = router => {
    //   USER REGISTRATION
    router.post('/users', (req, res) => {
        var newUser = new User(req.body);
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.json({ success: false, message: 'Ensure username, email and password were provided' });
        } else {
            newUser.save((err, savedUser) => {
                if (err) {
                    return res.json({ success: false, message: 'Username or email already exists' });
                } else {
                    return res.json({ success: true, message: 'User created' });
                }
            });
        }

    });
    // USER LOGIN ROUTE
    // http://localhost:port/api/authenticate

    router.post('/authenticate', (req, res) => {
        User.findOne({ username: req.body.username }).select('email username password').exec((err, user) => {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Could not authenticate' });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({ success: false, message: 'Password not valid' });
                    } else {
                        // web token
                        var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h'} );

                        res.json({ success: true, message: 'User Authenticated!', token: token });
                    }
                } else {
                    res.json({ success: false, message: 'No password provided' });
                }
            }

        });
    });

    router.use('/currentUser',function(req, res, next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if(token) {
            // verify token
            jwt.verify(token, secret, function(err, decoded) {
                if(err) {
                    res.json({ success: false, message:'Token invalid'} );
                }else {
                    req.decoded = decoded;
                    next();
                }
            });
        }else {
            res.json({ succes: false, message: 'No token Provided' })
        }
    });

    router.post('/currentUser', (req, res) => {
        res.send(req.decoded);
    });
	return router;
}



