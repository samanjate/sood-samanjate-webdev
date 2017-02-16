(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController);

    function pageListController(PageService, $routeParams, $location) {

        var vm = this;

        var userId = $routeParams['uid'];
        var webId = $routeParams['wid'];

        function init() {
            vm.pages = PageService.findPageByWebsiteId(webId);
        }
        init();

        vm.goToProfile = goToProfile;
        vm.goToPageEdit = goToPageEdit;
        vm.goToPageNew = goToPageNew;
        vm.goToWebsiteList = goToWebsiteList;
        vm.goToWidgetList = goToWidgetList;

        function goToProfile() {
            $location.url("/user/"+userId);
        }
        function goToPageEdit(p) {
            $location.url("/user/"+userId+"/website/"+webId+"/page/"+p._id);
        }
        function goToPageNew() {
            $location.url("/user/"+userId+"/website/"+webId+"/page/new");
        }
        function goToWebsiteList() {
            $location.url("/user/"+userId+"/website");
        }
        function goToWidgetList(page) {
            $location.url("/user/"+userId+"/website/"+webId+"/page/"+page._id+"/widget");
        }

    }
})();