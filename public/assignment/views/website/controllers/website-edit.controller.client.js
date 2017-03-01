(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", websiteEditController);

    function websiteEditController(WebsiteService, $routeParams, $location) {

        var vm = this;

        var userId = $routeParams['uid'];
        var webId = $routeParams['wid'];

        vm.deleteWebsite = deleteWebsite;
        vm.editWebsite = editWebsite;
        vm.createWebsite = createWebsite;
        vm.websiteList = websiteList;
        vm.goToProfile = goToProfile;
        vm.goToEditWebsite = goToEditWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (allWebsites) {
                    vm.websites = allWebsites;
                });
            WebsiteService
                .findWebsiteById(webId,userId)
                .success(function (websites) {
                    vm.website = websites;
                });
        }
        init();

        function createWebsite() {
            $location.url("/user/"+userId+"/website/new");
        }

        function editWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(webId, userId, newWebsite)
                .success(function () {
                    
                });
            $location.url("/user/"+userId+"/website");
        }

        function deleteWebsite(website) {
            WebsiteService
                .deleteWebsite(webId, userId)
                .success(function () {
                });
            $location.url("/user/"+userId+"/website");
        }

        function websiteList() {
            $location.url("/user/"+userId+"/website");
        }

        function goToProfile() {
            $location.url("/user/"+userId);
        }

        function goToEditWebsite(website) {
            $location.url("/user/"+userId+"/website/"+website._id);
        }

    }
})();