var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var mongoose = require("mongoose");

module.exports = function(app, model) {
    var auth = "authorized";
    app.post("/api/project/user/login", passport.authenticate("local"), login);
    app.get("/api/project/user/loggedin", loggedin);
    app.get("/api/project/user", getUsers);
    app.put("/api/project/user/:id", updateProfile);
    app.put("/api/project/user/:id/addTeam/:name", addTeamForUser);
    app.put("/api/project/user/:id/deleteTeam/:index", deleteTeamForUser);
    app.post("/api/project/user", register);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/logout", logout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    } else {
                        return done(null, user);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function (response) {
                    done(null, response);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function getUsers(req, res) {
        if (Object.keys(req.query).length == 0) {
            model.findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
        else {
            var query = req.query;
            if (query.hasOwnProperty("password")) {
                var credentials = query;
                model.findUserByCredentials(credentials)
                    .then(
                        function (user) {
                            req.session.currentUser = user;
                            res.json(user);
                        },
                        function (err) {
                            res.status(400).send(err);
                        }
                    )
            } else {
                var username = query.username;
                var user = model.findUserByUsername(username)
                    .then(
                        function (user) {
                            res.json(user);
                        },
                        function (err) {
                            res.status(400).send(err);
                        }
                    )
            }
        }
    }

    function updateProfile(req, res) {
        var userId = req.params.id;
        var newUserObj = req.body;
        model.updateUser(userId,newUserObj)
            .then(
                function(user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function addTeamForUser(req, res) {
        var userId =req.params.id;
        var teamName = req.params.name;
        var user = model.addTeamForUser(userId,teamName).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function deleteTeamForUser(req, res) {
        var userId = req.params.id;
        var index = req.params.index;
        var user = model.deleteTeamForUser(userId,index).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function register(req, res) {
        var newUser = req.body;
        model.createUser(newUser).then(
            function(user) {
                if(user){
                    req.login(user, function(err){
                        if(err){
                            console.log("error case: ");
                            res.status(400).send(err);
                        } else {
                            console.log("service server: ");
                            console.log(user);
                            res.json(user);
                        }
                    });
                }
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        model.deleteUser(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send(null);
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }



    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function authorized (req,res,next){
        if(!req.isAuthenticated())
        {
            res.send(401);
        }
        else{
            next();
        }
    }
};