(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController(WebsiteService, $routeParams, $location) {

        var vm = this;

        var userId = $routeParams['uid'];
        var webId = $routeParams['wid'];

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        vm.createWebsite = createWebsite;
        vm.goToProfile = goToProfile;
        vm.editWebsite = editWebsite;

        function createWebsite() {
            $location.url("/user/"+userId+"/website/new");
        }

        function goToProfile() {
            $location.url("/user/"+userId);
        }

        function editWebsite(website) {
            $location.url("/user/"+userId+"/website/"+website._id);
        }

    }
})();