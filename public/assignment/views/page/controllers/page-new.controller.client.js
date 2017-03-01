(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);

    function pageNewController(PageService, $routeParams, $location) {

        var vm = this;

        var userId = $routeParams['uid'];
        var webId = $routeParams['wid'];

        function init() {
            PageService
                .findPageByWebsiteId(userId, webId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
        init();

        vm.goToProfile = goToProfile;
        vm.goToPageEdit = goToPageEdit;
        vm.createNewPage = createNewPage;
        vm.goToPageList = goToPageList;
        vm.goToPageNew = goToPageNew;
        vm.goToWidgetList = goToWidgetList;

        function goToProfile() {
            $location.url("/user/"+userId);
        }
        function goToPageEdit(p) {
            $location.url("/user/"+userId+"/website/"+webId+"/page/"+p._id);
        }
        function createNewPage(page) {
            PageService
                .createPage(userId, webId,page)
                .success(function () {
                    
                });
            $location.url("/user/"+userId+"/website/"+webId+"/page");
        }
        function goToPageList() {
            $location.url("/user/"+userId+"/website/"+webId+"/page/");
        }
        function goToPageNew() {
            $location.url("/user/"+userId+"/website/"+webId+"/page/new");
        }
        function goToWidgetList(p) {
            $location.url("/user/"+userId+"/website/"+webId+"/page/"+p._id+"/widget");
        }

    }
})();