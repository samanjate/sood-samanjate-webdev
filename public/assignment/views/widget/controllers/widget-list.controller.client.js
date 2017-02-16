(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController);

    function widgetListController($routeParams, WidgetService, $sce, $location) {
        var vm =this;

        vm.userId = $routeParams['uid'];
        vm.webId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.doYouTrust = doYouTrust;
        vm.getTrustedHTML = getTrustedHTML;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();
        
        vm.goToEditWidget = goToEditWidget;
        vm.goToChooser =goToChooser;
        vm.goToPageList = goToPageList;
        vm.goToProfile = goToProfile;
        
        function doYouTrust(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
        function getTrustedHTML(html) {
            return $sce.trustAsHtml(html);
        }
        function goToEditWidget(w) {
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.pageId+"/widget/"+w._id);
        }
        function goToChooser() {
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.pageId+"/widget/new");
        }
        function goToPageList() {
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();