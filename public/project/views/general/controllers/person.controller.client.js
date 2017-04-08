(function () {
    angular
        .module("GoMovies")
        .controller("PersonController", personController);

    function personController($routeParams, SearchService) {
        var vm = this;

        var userId = $routeParams['uid'];
        var personId = $routeParams['pid'];

        function init() {
            SearchService
                .getPersonById(personId)
                .then(function (response) {
                    vm.person = response.data;
                })
        }
        init();

    }

})();