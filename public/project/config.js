(function () {
    angular
        .module("GoMovies")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/general/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
    }
})();
