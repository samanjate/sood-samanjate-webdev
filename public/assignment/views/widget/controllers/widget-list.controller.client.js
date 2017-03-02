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

        // $(".widget-list").sortable({
        //     axis: "y"
        // });

        function init() {
             WidgetService
                 .findWidgetsByPageId(vm.userId, vm.webId, vm.pageId)
                 .success(function (widgets) {
                     vm.widgets = widgets;
                 });
        }
        init();
        
        vm.goToEditWidget = goToEditWidget;
        vm.goToChooser =goToChooser;
        vm.goToPageList = goToPageList;
        vm.goToProfile = goToProfile;
        vm.updateWidgetPosition = updateWidgetPosition;
        
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
        function updateWidgetPosition(startIndex, finalIndex, pageId) {
            return $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + finalIndex);
        }
    }
})();