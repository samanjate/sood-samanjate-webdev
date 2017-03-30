(function () {
    angular
        .module("GoMovies")
        .controller("HomeController", homeController);

    function homeController(MovieService, TvShowService) {
        var vm = this;

        function init() {
            vm.myInterval = 3000;
            MovieService
                .searchUpcomingMovies()
                .then(function (response){
                    vm.slides = response.data.results;
                });
            MovieService
                .topRatedMovies()
                .then(function (response) {
                    vm.topMovies = response.data.results;
                });
            TvShowService
                .topRatedTvShows()
                .then(function (response) {
                    vm.topTvShows = response.data.results;
                });
        }
        init();

    }

})();