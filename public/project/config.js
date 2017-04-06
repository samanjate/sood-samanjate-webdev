(function () {
    angular
        .module("GoMovies")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/general/templates/home2.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
    }
})();
