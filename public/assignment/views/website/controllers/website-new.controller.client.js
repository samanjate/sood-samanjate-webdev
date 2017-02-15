(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController(WebsiteService, $routeParams,$location) {

        var vm = this;

        var userId = $routeParams['uid'];

        vm.createNewWebsite = createNewWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function createNewWebsite(website) {
            WebsiteService.createWebsite(userId,website);
            $location.url("/user/"+userId+"/website");
        }

    }
})();