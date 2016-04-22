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

        model.createUser(user)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {
            var credentials = req.query;
            model.findUserByCredentials(credentials)
                .then(
                    function(user) {
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        model.findUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateProfile(req, res) {
        var userId = req.params.id;
        var user = req.body;
        model.updateUser(userId, user)
            .then(
                function(doc) {
                    res.json(doc);
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

};