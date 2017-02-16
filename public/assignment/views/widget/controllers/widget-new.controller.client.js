(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm =this;

        vm.userId = $routeParams['uid'];
        vm.webId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            vm.widgets = WidgetService.findDistinctWidget();
        }
        init();

        vm.goToEditWidget = goToEditWidget;
        vm.goToProfile = goToProfile;
        vm.goToWebsiteList = goToWebsiteList;

        function goToEditWidget(wType) {
            var widget = {
                "_id" : String(Math.floor(Math.random() * 999)),
                "widgetType" : String(wType)
            };
            WidgetService.createWidget(vm.pageId,widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.pageId+"/widget/"+widget._id);
        }

        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }

        function goToWebsiteList() {
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.pageId+"/widget");
        }

    }
})();