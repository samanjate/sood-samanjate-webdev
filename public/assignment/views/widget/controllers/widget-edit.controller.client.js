(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", widgetEditController);

    function widgetEditController(WidgetService, $routeParams, $location) {

        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.webId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.wgId = $routeParams['wgid'];

        function init() {
            WidgetService
                .findWidgetById(vm.userId, vm.webId, vm.pageId, vm.wgId)
                .success(function (widget) {
                     vm.widget = widget;
                 });
        }
        init();

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;
        vm.goToWidgetList = goToWidgetList;
        vm.updateWidget = updateWidget;
        vm.goToProfile = goToProfile;

        function getEditorTemplateUrl(wtype) {
            return 'views/widget/editors/widget-' + wtype +'-edit.view.client.html';
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.userId, vm.webId, vm.pageId, vm.wgId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.pageId+"/widget");
                });
        }

        function goToWidgetList() {
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.pageId+"/widget");
        }
        function updateWidget() {
            WidgetService
                .updateWidget(vm.userId, vm.webId, vm.pageId, vm.wgId, vm.widget)
                .success(function () {

                });
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.pageId+"/widget");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();