module.exports = function(app, model) {
    app.get("/api/project/user", getUsers);
    app.put("/api/project/user/:id", updateProfile);
    app.put("/api/project/user/:id/addTeam/:name", addTeamForUser);
    app.put("/api/project/user/:id/deleteTeam/:index", deleteTeamForUser);
    app.post("/api/project/user", register);

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
                var user = model.findUserByCredentials(credentials)
                    .then(
                        function (user) {
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
        var user = model.updateUser(userId,newUserObj)
            .then(
                function(user) {
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
        var user = model.createUser(newUser).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

};