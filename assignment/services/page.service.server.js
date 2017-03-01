module.exports = function (app) {

    app.post("/api/user/:uid/website/:wid/page/new/", createPage);
    app.get("/api/user/:uid/website/:wid/page/", findPageByWebsiteId);
    app.get("/api/user/:uid/website/:wid/page/:pid/", findPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid",updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.wid;
        newPage._id = String(Math.floor(Math.random() * 999));
        newPage.websiteId = String(websiteId);
        pages.push(newPage);
        res.json(newPage);
    }
    
    function findPageByWebsiteId(req, res) {
        var allPages = [];
        var websiteId = req.params.wid;
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                allPages.push(pages[p]);
            }
        }
        res.json(allPages);
    }
    
    function findPageById(req, res) {
        var pageId = req.params.pid;
        for(var p in pages){
            if(pages[p]._id === pageId) {
                res.json(pages[p]);
            }
        }
    }

    function updatePage(req, res) {
        var pageId = req.params.pid;
        var page = req.body;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                page._id = pageId;
                page.websiteId = pages[p].websiteId;
                pages[p] = page;
                res.json(pages[p]);
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                var index = pages.indexOf(pages[p]);
                if(index > -1) {
                    pages.splice(index,1);
                    return;
                }
            }
        }
    }

}