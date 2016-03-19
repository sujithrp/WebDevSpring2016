/**
 * Created by SujithNarayan on 3/16/2016.
 */

module.exports = function(app, model) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateProfile);
    app.delete("/api/assignment/user/:id", deleteUser);


    function register(req, res) {
        var user = req.body;
        user = model.createUser(user);
        res.json(user);
    }

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

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = model.findUserById(userId);
        res.json(user);
    }

    function updateProfile(req, res) {
        var userId = req.params.id;
        var user = req.body;
        res.json(model.updateUser(userId, user));
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        model.deleteUser(userId);
    }

};