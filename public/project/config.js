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
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin}
            })
            .when("/edit-profile", {
                templateUrl: "views/user/templates/edit-profile.view.client.html",
                controller: "EditProfileController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin}
            })
            .when("/search", {
                templateUrl: "views/general/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/movie/:mid", {
                templateUrl: "views/general/templates/movie.view.client.html",
                controller: "MovieController",
                controllerAs: "model"
            })
            .when("/person/:pid", {
                templateUrl: "views/general/templates/person.view.client.html",
                controller: "PersonController",
                controllerAs: "model"
            })
            .when("/tv/:tid", {
                templateUrl: "views/general/templates/tvshow.view.client.html",
                controller: "TvController",
                controllerAs: "model"
            })
            .when("/write-review/:eid", {
                templateUrl: "views/review/templates/write-review.view.client.html",
                controller: "WReviewController",
                controllerAs: "model"
            })
            .when("/read-review/:eid", {
                templateUrl: "views/review/templates/read-review.view.client.html",
                controller: "RReviewController",
                controllerAs: "model"
            })
    }

    var checkLoggedin = function($q, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin/audience')
            .success(function(user) {
            $rootScope.errorMessage = null;
            if (user) $rootScope.currentUser = user;
             deferred.resolve();
        });
        return deferred.promise;
    };
})();
