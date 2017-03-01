(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService($http) {

        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        }

        return api;

        function createPage(userId, websiteId, newPage) {
            return $http.post("/api/user/"+userId+"/website/"+websiteId+"/page/new/",newPage);
        }

        function findPageByWebsiteId(userId, websiteId) {
            return $http.get("/api/user/"+userId+"/website/"+websiteId+"/page/");
        }

        function findPageById(userId, websiteId, pageId) {
            return $http.get("/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId);
        }

        function updatePage(userId, websiteId, pageId, newPage) {
            return $http.put("/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId,newPage);
        }

        function deletePage(userId, websiteId, pageId) {
            return $http.delete("/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId);
        }
    }
})();