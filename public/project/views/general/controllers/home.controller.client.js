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
            MovieService
                .movieGenres()
                .then(function (response) {
                    vm.genres = response.data.genres;
                });
            MovieService
                .popularPeople()
                .then(function (response) {
                    vm.people = response.data.results;
                });
            TvShowService
                .topRatedTvShows()
                .then(function (response) {
                    vm.topTvShows = response.data.results;
                });
            TvShowService
                .latestTvShows()
                .then(function (response) {
                    vm.latestTvShows = response.data.results;
                });
            TvShowService
                .airingNow()
                .then(function (response) {
                    vm.airingNow = response.data.results;
                })
        }
        init();

    }

})();