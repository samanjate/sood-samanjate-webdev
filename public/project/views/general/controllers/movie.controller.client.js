(function () {
    angular
        .module("GoMovies")
        .controller("MovieController", movieController);

    function movieController($sce, $location, $routeParams, MovieService) {
        var vm = this;

        var userId = $routeParams['uid'];
        var movieId = $routeParams['mid'];

        function init() {
            MovieService
                .getMovieById(movieId)
                .then(function (response) {
                    vm.movie = response.data;
                    vm.cast = response.data.credits.cast;
                    vm.trailers = [];
                    if (response.data.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        for(var t in response.data.videos.results) {
                            var trailer = {};
                            trailer.video_path = $sce.trustAsResourceUrl(embedUrl + response.data.videos.results[t].key);
                            trailer.untrusted_video_url = embedUrl + response.data.videos.results[t].key;
                            vm.trailers.push(trailer);
                        }
                    }
                })
            MovieService
                .getSimilarMovies(movieId)
                .then(function (response) {
                    vm.similarMovies = response.data.results;
                })
        }
        init();

        vm.goToMoviePage = goToMoviePage;
        vm.goToPersonProfile = goToPersonProfile;
        vm.goToHomePage = goToHomePage;

        function goToMoviePage(movieId) {
            if(userId) $location.url("/" + userId + "/movie/" + movieId);
            else $location.url("/0/movie/" + movieId);
        }

        function goToPersonProfile(personId) {
            if(userId) $location.url("/" + userId + "/person/" + personId);
            else $location.url("/0/person/" + personId);
        }

        function goToHomePage() {
            $location.url("/");
        }

    }

})();