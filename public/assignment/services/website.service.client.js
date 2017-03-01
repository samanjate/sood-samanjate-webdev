(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    function WebsiteService($http) {

        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };

        return api;

        function createWebsite(userId, newWebsite) {
            return $http.post("/api/user/"+userId+"/website/",newWebsite);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website/");
        }

        function findWebsiteById(websiteId,userId) {
            return $http.get("/api/user/"+userId+"/website/"+websiteId);
        }

        function updateWebsite(websiteId, userId, newWebsite) {
            return $http.put("/api/user/"+userId+"/website/"+websiteId, newWebsite);
        }

        function deleteWebsite(websiteId, userId) {
            return $http.delete("/api/user/"+userId+"/website/"+websiteId);
        }
    }
})();