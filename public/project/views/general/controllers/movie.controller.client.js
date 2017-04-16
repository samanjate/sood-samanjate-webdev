(function () {
    angular
        .module("GoMovies")
        .controller("MovieController", movieController);

    function movieController($sce, $location, $routeParams, MovieService, UserService, $rootScope) {
        var vm = this;

        vm.posterNotFound = 'http://s3.amazonaws.com/static.betaeasy.com/screenshot/456/456-25984-14192637741419263774.42.jpeg';

        var userId = 0;
        if($rootScope.currentUser) userId = $rootScope.currentUser._id;
        var movieId = $routeParams['mid'];

        function init() {
            vm.wantToSee = false;
            vm.isUser = false;
            vm.isCritic = false;
            vm.isGuest = false;
            vm.stopRating = false;
            if(userId == 0) vm.isGuest = true;
            MovieService
                .getMovieByIdFromDb(movieId)
                .then(function (response) {
                    if(response.data.numOfRatings)
                        vm.userAvgRating = (response.data.numOfRatings * 2) / response.data.totalRatings;
                }, function (err) {
                });
            UserService
                .findUserById(userId)
                .then(function (user) {
                    if(user.data) {
                        vm.isUser = true;
                        var ratedMovies = user.data.ratings;
                        for(var m in ratedMovies) {
                            if(ratedMovies[m].id == movieId) {
                                vm.stars = ratedMovies[m].rating;
                                vm.stopRating = true;
                            }
                        }
                    } else {
                        UserService
                            .findCriticById(userId)
                            .then(function (user) {
                                if(user.data) vm.isCritic = true;
                                else vm.isGuest = true;
                            }, function (err) {

                            });
                    }
                }, function (err) {

                });
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
        vm.rateThis = rateThis;
        vm.goToReadReview = goToReadReview;
        vm.goToWriteReview = goToWriteReview;

        function goToLoginOrProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/profile');
        }

        function goToMoviePage(movieId) {
            $location.url("/movie/" + movieId);
        }

        function goToPersonProfile(personId) {
            $location.url("/person/" + personId);
        }

        function goToHomePage() {
            $location.url('/');
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

        function rateThis(stars, movie, isCritic) {
            UserService
                .updateUserRating(userId,movie,stars,isCritic)
                .then(function (response) {
                    MovieService
                        .updateRatings(movie,stars)
                        .then(function (response) {
                            vm.stopRating = true;
                            vm.stars = stars;
                            vm.movieFromDb = response.data;
                            vm.userAvgRating = (response.data.numOfRatings * 2) / response.data.totalRatings;
                        }, function (err) {
                        });
                }, function(err) {
                });
        }

        function goToReadReview(movieId) {
            $location.url("/read-review/" + movieId+"?type=movie");
        }

        function goToWriteReview(movieId) {
            $location.url("/write-review/" + movieId+"?type=movie");
        }

    }

})();