(function () {
    angular
        .module("GoMovies")
        .controller("MovieController", movieController);

    function movieController($routeParams, MovieService) {
        var vm = this;

        var userId = $routeParams['uid'];
        var movieId = $routeParams['mid'];

        function init() {
            MovieService
                .getMovieById(movieId)
                .then(function (response) {
                    vm.movie = response.data;
                })
        }
        init();

    }

})();