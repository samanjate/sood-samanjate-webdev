(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        }

        return api;

        function createPage(websiteId, page) {
            page._id = String(Math.floor(Math.random() * 999));
            page.websiteId = String(websiteId);
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var allPages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    allPages.push(pages[p]);
                }
            }
            return allPages;
        }

        function findPageById(pageId) {
            for(var p in pages){
                if(pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    page._id = pageId;
                    page.websiteId = pages[p].websiteId;
                    pages[p] = page;
                }
            }
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    var index = pages.indexOf(findPageById(pageId));
                    if(index > -1) {
                        pages.splice(index,1);
                    }
                }
            }
        }
    }
})();