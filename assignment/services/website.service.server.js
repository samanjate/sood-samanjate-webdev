module.exports = function (app, websiteModel) {

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/user/:userId/website/:wid", findWebsiteById);
    app.put("/api/user/:userId/website/:wid", updateWebsite);
    app.post("/api/user/:userId/website/", createWebsite);
    app.delete("/api/user/:userId/website/:wid", deleteWebsite);

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findWebsiteById(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.wid;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.wid;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(function (response) {
                // if(response.nModified === 1 && response.ok === 1 && response.n === 1){
                if(response.ok === 1 && response.n === 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    
    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        newWebsite.developerId = String(userId);
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.json(website);
            },function (err) {
                res.sendStatus(404);
            });
    }
    
    function deleteWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.wid;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
}