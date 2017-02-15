(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController(WebsiteService, $routeParams,$location) {

        var vm = this;

        var userId = $routeParams['uid'];

        vm.createNewWebsite = createNewWebsite;
        vm.createWebsite = createWebsite;
        vm.websiteList = websiteList;
        vm.goToEditWebsite = goToEditWebsite;
        vm.goToProfile = goToProfile;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function createNewWebsite(website) {
            WebsiteService.createWebsite(userId,website);
            $location.url("/user/"+userId+"/website");
        }

        function createWebsite() {
            $location.url("/user/"+userId+"/website/new");
        }

        function websiteList() {
            $location.url("/user/"+userId+"/website");
        }

        function goToEditWebsite(website) {
            $location.url("/user/"+userId+"/website/"+website._id);
        }

        function goToProfile() {
            $location.url("/user/"+userId);
        }


    }
})();