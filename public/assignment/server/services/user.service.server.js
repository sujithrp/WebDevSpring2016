/**
 * Created by SujithNarayan on 3/16/2016.
 */

module.exports = function(app, model) {
    app.post("/api/assignment/user/login", login);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
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
                    req.session.currentUser = doc;
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

    function login(req, res){
        console.log("inside server service login");
        model.findUserByCredentials(req.body).then(
            function(user){
                console.log("found user");
                console.log(user);
                req.session.currentUser = user;
                res.json(user);
            });
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
    

};