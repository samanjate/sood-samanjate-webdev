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
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/:uid/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
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
            .when("/:uid/person/:pid", {
                templateUrl: "views/general/templates/person.view.client.html",
                controller: "PersonController",
                controllerAs: "model"
            })
            .when("/:uid/tv/:tid", {
                templateUrl: "views/general/templates/tvshow.view.client.html",
                controller: "TvController",
                controllerAs: "model"
            })
    }
})();
