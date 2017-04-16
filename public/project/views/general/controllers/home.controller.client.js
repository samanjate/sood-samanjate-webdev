(function () {
    angular
        .module("GoMovies")
        .controller("HomeController", homeController);

    function homeController($location, MovieService, TvShowService, $rootScope) {
        var vm = this;

        var userId = null;
        if($rootScope.currentUser) userId = $rootScope.currentUser._id;

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
                });
        }
        init();

        // event handlers
        vm.searchResults = searchResults;
        vm.findGenreMovies = findGenreMovies;
        vm.goToMoviePage = goToMoviePage;
        vm.goToPersonProfile = goToPersonProfile;
        vm.goToTvPage = goToTvPage;
        vm.goToLoginOrProfile = goToLoginOrProfile;
        vm.goToHomePage = goToHomePage;

        function goToHomePage() {
            $location.url("/");
        }
        
        function searchResults() {
            if(vm.searchKeyword) {
                $location.url("/search?keyword=" + vm.searchKeyword);
            }

        }

        function findGenreMovies(name, id) {
            $location.url("/search?keyword=" + name + "&genre=" + id);
        }

        function goToMoviePage(movieId) {
            $location.url("/movie/" + movieId);
        }

        function goToPersonProfile(personId) {
            $location.url("/person/" + personId);
        }

        function goToTvPage(tvId) {
            $location.url("/tv/" + tvId);
        }

        function goToLoginOrProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/profile');
        }

    }

})();