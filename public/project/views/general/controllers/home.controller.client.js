(function () {
    angular
        .module("GoMovies")
        .controller("HomeController", homeController);

    function homeController($location, $routeParams, MovieService, TvShowService) {
        var vm = this;

        var userId = $routeParams['uid'];

        function init() {
            vm.searchKeyword = null;
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

        // event handlers
        vm.searchResults = searchResults;
        vm.findGenreMovies = findGenreMovies;
        vm.goToMoviePage = goToMoviePage;
        vm.goToPersonProfile = goToPersonProfile;
        
        function searchResults() {
            if(vm.searchKeyword) {
                if(userId) $location.url("/" + userId + "/search?keyword=" + vm.searchKeyword);
                else $location.url("/0/search?keyword=" + vm.searchKeyword);
            }

        }

        function findGenreMovies(name, id) {
            if(userId) $location.url("/" + userId + "/search?keyword=" + name + "&genre=" + id);
            else $location.url("/0/search?keyword=" + name + "&genre=" + id);
        }

        function goToMoviePage(movieId) {
            if(userId) $location.url("/" + userId + "/movie/" + movieId);
            else $location.url("/0/movie/" + movieId);
        }

        function goToPersonProfile(personId) {
            if(userId) $location.url("/" + userId + "/person/" + personId);
            else $location.url("/0/person/" + personId);
        }

    }

})();