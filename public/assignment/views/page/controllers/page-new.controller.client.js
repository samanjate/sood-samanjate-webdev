(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);

    function pageNewController(PageService, $routeParams, $location) {

        var vm = this;

        var userId = $routeParams['uid'];
        var webId = $routeParams['wid'];

        function init() {
            vm.pages = PageService.findPageByWebsiteId(webId);
        }
        init();

        vm.goToProfile = goToProfile;
        vm.goToPageEdit = goToPageEdit;
        vm.createNewPage = createNewPage;
        vm.goToPageList = goToPageList;
        vm.goToPageNew = goToPageNew;

        function goToProfile() {
            $location.url("/user/"+userId);
        }
        function goToPageEdit(p) {
            $location.url("/user/"+userId+"/website/"+webId+"/page/"+p._id);
        }
        function createNewPage(page) {
            PageService.createPage(webId,page);
            $location.url("/user/"+userId+"/website/"+webId+"/page");
        }
        function goToPageList() {
            $location.url("/user/"+userId+"/website/"+webId+"/page/");
        }
        function goToPageNew() {
            $location.url("/user/"+userId+"/website/"+webId+"/page/new");
        }

    }
})();