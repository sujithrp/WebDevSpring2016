module.exports = function(app, model) {
    app.get("/api/project/user", getUsers);
    app.put("/api/project/user/:id", updateProfile);
    app.put("/api/project/user/:id/addTeam/:name", addTeamForUser);
    app.put("/api/project/user/:id/deleteTeam/:index", deleteTeamForUser);
    app.post("/api/project/user", register);

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (!username && !password) {
            var users = model.findAllUsers();
            res.json(users);
        }
        else if (username && !password) {
            var user = model.findUserByUsername(username);
            res.json(user);
        }
        else {
            var credentials = req.query;
            var user = model.findUserByCredentials(credentials);
            res.json(user);
        }
    }

    function updateProfile(req, res) {
        var userId = req.params.id;
        var user = req.body;
        res.json(model.updateUser(userId, user));
    }

    function addTeamForUser(req, res) {
        var userId =req.params.id;
        var teamName = req.params.name;
        res.json(model.addTeamForUser(userId, teamName));
    }

    function deleteTeamForUser(req, res) {
        var userId = req.params.id;
        var index = req.params.index;
        res.json(model.deleteTeamForUser(userId, index));
    }

    function register(req, res) {
        var user = req.body;
        user = model.createUser(user);
        res.json(user);
    }

};