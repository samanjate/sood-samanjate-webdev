(function () {
    angular
        .module("GoMovies")
        .controller("MovieController", movieController);

    function movieController($sce, $location, $routeParams, MovieService) {
        var vm = this;

        vm.posterNotFound = 'http://s3.amazonaws.com/static.betaeasy.com/screenshot/456/456-25984-14192637741419263774.42.jpeg';

        var userId = $routeParams['uid'];
        var movieId = $routeParams['mid'];

        function init() {
            vm.wantToSee = false;
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
                });
            MovieService
                .getSimilarMovies(movieId)
                .then(function (response) {
                    vm.similarMovies = response.data.results;
                });
            MovieService
                .getWantToSeeMovies(userId)
                .then(function (response) {
                    for(var movie in response.data) {
                        if(movieId == response.data[movie].id) {
                            vm.wantToSee = true;
                        }
                    }
                });
        }
        init();

        vm.goToMoviePage = goToMoviePage;
        vm.goToPersonProfile = goToPersonProfile;
        vm.goToHomePage = goToHomePage;
        vm.goToLoginOrProfile = goToLoginOrProfile;
        vm.addToWantToSee = addToWantToSee;
        vm.deleteToWantToSee = deleteToWantToSee;

        function goToLoginOrProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/' + userId + '/profile');
        }

        function goToMoviePage(movieId) {
            if(userId) $location.url("/" + userId + "/movie/" + movieId);
            else $location.url("/0/movie/" + movieId);
        }

        function goToPersonProfile(personId) {
            if(userId) $location.url("/" + userId + "/person/" + personId);
            else $location.url("/0/person/" + personId);
        }

        function goToHomePage() {
            if(!userId || userId==0)  $location.url("/");
            else $location.url('/' + userId );
        }

        function addToWantToSee() {
            MovieService
                .getMovieById(movieId)
                .then(function (response) {
                    var movieDetails = response.data;
                    MovieService
                        .addToWantToSee(userId, movieDetails)
                        .then(function (response) {
                            vm.wantToSee = true;
                        }, function (err) {
                        });
                });
        }

        function deleteToWantToSee() {
            MovieService
                .deleteToWantToSee(userId, movieId)
                .then(function (response) {
                    vm.wantToSee = false;
                }, function (err) {
                });
        }

    }

})();