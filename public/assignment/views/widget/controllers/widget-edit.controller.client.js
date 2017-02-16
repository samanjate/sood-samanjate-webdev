/**
 * Created by samanjatesood on 14/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", widgetEditController);

    function widgetEditController(WidgetService, $routeParams, $location) {

        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.webId = $routeParams['wid'];
        vm.webId = $routeParams['pid'];
        vm.wgId = $routeParams['wgid'];

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgId);
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
            WidgetService.deleteWidget(vm.wgId);
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.webId+"/widget");
        }

        function goToWidgetList() {
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.webId+"/widget");
        }
        function updateWidget() {
            WidgetService.updateWidget(vm.wgId, vm.widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page/"+vm.webId+"/widget");
        }
        function goToProfile() {
            $location.url("/user/"+vm.userId);
        }
    }
})();