module.exports = function (app,pageModel) {

    app.post("/api/user/:uid/website/:wid/page/new/", createPage);
    app.get("/api/user/:uid/website/:wid/page/", findPageByWebsiteId);
    app.get("/api/user/:uid/website/:wid/page/:pid/", findPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid",updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.wid;
        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    
    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.wid;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    
    function findPageById(req, res) {
        var pageId = req.params.pid;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pid;
        var updatedPage = req.body;
        pageModel
            .updatePage(pageId, updatedPage)
            .then(function (response) {
                if(response.ok === 1 && response.n === 1){
                    // if(response.nModified === 1 && response.ok === 1 && response.n === 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        pageModel
            .deletePage(pageId)
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