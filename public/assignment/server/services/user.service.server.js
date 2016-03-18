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
        console.log("user to be created");
        console.log(user);
        user = model.createUser(user);
        res.json(user);
    }

    function getUsers(req, res) {
        console.log("get users");
        var username = req.query.username;
        var password = req.query.password;
        console.log(username);
        console.log(password);

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
            console.log(credentials);
            var user = model.findUserByCredentials(credentials);
            res.json(user);
        }
    }

    function findUserById(req, res) {
        console.log("service");
        var userId = req.params.id;
        var user = model.findUserById(userId);
        console.log("returned");
        res.json(user);
    }

    function updateProfile(req, res) {
        var userId = req.params.id;
        var user = req.body;
        console.log("update in server, user id : "+userId);
        console.log("updae in server, user: "+user);
        res.json(model.updateUser(userId, user));
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        model.deleteUser(userId);
    }

};