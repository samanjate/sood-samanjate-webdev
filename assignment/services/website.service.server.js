module.exports = function (app) {

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/user/:userId/website/:wid", findWebsiteById);
    app.put("/api/user/:userId/website/:wid", updateWebsite);
    app.post("/api/user/:userId/website/", createWebsite);
    app.delete("/api/user/:userId/website/:wid", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var allWebsites = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                allWebsites.push(websites[w]);
            }
        }
        res.json(allWebsites);
    }

    function findWebsiteById(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.wid;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                res.json(websites[w]);
            }
        }
        return;
    }

    function updateWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.wid;
        var newWebsite = req.body;
        newWebsite.developerId = userId;
        newWebsite.websiteId = websiteId;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites[w] = newWebsite;
                res.json(websites[w]);
            }
        }
        return;
    }
    
    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        newWebsite._id = String(Math.floor(Math.random() * 999));
        newWebsite.developerId = String(userId);
        websites.push(newWebsite);
        res.json(newWebsite._id);
    }
    
    function deleteWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.wid;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                var index = websites.indexOf(websites[w]);
                if (index > -1) {
                    websites.splice(index, 1);
                    return;
                }
            }
        }
    }
}