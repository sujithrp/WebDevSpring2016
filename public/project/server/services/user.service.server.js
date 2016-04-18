module.exports = function(app, model) {
    app.post("/api/project/user/login", login);
    app.get("/api/project/user/loggedin", loggedin);
    app.get("/api/project/user", getUsers);
    app.put("/api/project/user/:id", updateProfile);
    app.put("/api/project/user/:id/addTeam/:name", addTeamForUser);
    app.put("/api/project/user/:id/deleteTeam/:index", deleteTeamForUser);
    app.post("/api/project/user", register);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/logout", logout);

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
            if (query.hasOwnProperty('password')) {
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
                req.session.currentUser = user;
                res.json(user);
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
        res.json(req.session.currentUser);
    }

    function login(req, res) {
        var credentials = req.body;
        model.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    console.log("server side find user by creds");
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }


    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};