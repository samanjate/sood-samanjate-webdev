module.exports = function (app, CriticModel) {

    app.post("/api/critic", createUser);
    app.get("/api/critic", findUser);
    app.get("/api/critic/:uid", findUserById);
    app.put("/api/critic/:uid", updateUser);


    function createUser(req, res) {
        var newUser = req.body;
        newUser.firstName = null;
        newUser.lastName = null;
        newUser.email = null;
        newUser.phone = null;
        newUser.bio = null;
        newUser.profilePic = null;
        newUser.userType = 'critic';
        CriticModel
            .createUser(newUser)
            .then(function (newUser) {
                res.json(newUser);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUsersByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        CriticModel
            .findUserbyUsername(username)
            .then(function (users) {
                if(users.length != 0){
                    res.json(users[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findUsersByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        CriticModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                if(response.length != 0){
                    res.json(response[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        CriticModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var newUser = req.body;
        var userId = req.params.uid;
        CriticModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if(response.nModified === 1){
                    CriticModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        },function () {
                            res.sendStatus(404);
                        })
                }
                else{
                    res.sendStatus(404);
                }
            },function () {
                res.sendStatus(404);
            });
    }

};