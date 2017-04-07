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
            .when("/:uid", {
                templateUrl: "views/general/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/:uid/search", {
                templateUrl: "views/general/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/:uid/movie/:mid", {
                templateUrl: "views/general/templates/movie.view.client.html",
                controller: "MovieController",
                controllerAs: "model"
            })
    }
})();
