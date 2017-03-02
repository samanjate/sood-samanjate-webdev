(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDirective);

    function sortableDirective() {
        function linkFunc(scope, element, attributes, controller) {
            element.sortable({
                axis: 'y',

                start: function (event, ui) {
                    var initialIndex = ui.item.index();
                    ui.item.data('initial_index', initialIndex);
                },

                update: function (event, ui) {
                    var initialIndex = ui.item.data('initial_index');
                    var finalIndex = ui.item.index();
                    controller.updateWidgetPosition(initialIndex, finalIndex);
                }
            });
        }

        function SortingController($routeParams, WidgetService) {

            function updateWidgetPosition(initialIndex, finalIndex) {
                var pageId = $routeParams['pid'];
                WidgetService
                    .updateWidgetPosition(pageId, initialIndex, finalIndex)
                    .success(function () {
                        
                    });
            }

            this.updateWidgetPosition = updateWidgetPosition;
        }

        return {
            controller: SortingController,
            link: linkFunc
        };
    }


})();