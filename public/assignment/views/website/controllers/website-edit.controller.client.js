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

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            vm.website = WebsiteService.findWebsiteById(webId);
        }
        init();

        function editWebsite(website) {
            website._id = webId;
            website.developerId = userId;
            WebsiteService.updateWebsite(webId,website);
            $location.url("/user/"+userId+"/website");
        }

        function deleteWebsite(website) {
            WebsiteService.deleteWebsite(webId);
            $location.url("/user/"+userId+"/website");
        }

    }
})();