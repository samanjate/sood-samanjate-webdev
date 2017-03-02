(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);

    function pageEditController(PageService, $routeParams, $location) {

        var vm = this;

        var userId = $routeParams['uid'];
        var webId = $routeParams['wid'];
        var pageId = $routeParams['pid'];


        function init() {
            PageService
                .findPageByWebsiteId(userId, webId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            PageService
                .findPageById(userId, webId, pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }
        init();

        vm.goToProfile = goToProfile;
        vm.goToPages = goToPages;
        vm.deletePage = deletePage;
        vm.editPage = editPage;
        vm.goToPageNew = goToPageNew;
        vm.goToPageEdit = goToPageEdit;
        vm.goToWidgetList = goToWidgetList;

        function goToProfile() {
            $location.url("/user/"+userId);
        }

        function goToPages() {
            $location.url("/user/"+userId+"/website/"+webId+"/page");
        }

        function deletePage() {
            PageService
                .deletePage(userId, webId, pageId)
                .success(function () {
                    $location.url("/user/"+userId+"/website/"+webId+"/page");
                });

        }
        function editPage(page) {
            PageService
                .updatePage(userId, webId, pageId, page)
                .success(function () {
                    $location.url("/user/"+userId+"/website/"+webId+"/page");
                });

        }
        function goToPageNew() {
            $location.url("/user/"+userId+"/website/"+webId+"/page/new");
        }
        function goToPageEdit(p) {
            $location.url("/user/"+userId+"/website/"+webId+"/page/"+p._id);
        }
        function goToWidgetList(p) {
            $location.url("/user/"+userId+"/website/"+webId+"/page/"+p._id+"/widget");
        }

    }
})();