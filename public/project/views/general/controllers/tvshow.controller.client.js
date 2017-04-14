(function () {
    angular
        .module("GoMovies")
        .controller("TvController", tvController);

    function tvController($sce, $location, $routeParams, TvShowService, UserService) {
        var vm = this;

        var userId = $routeParams['uid'];
        var tvId = $routeParams['tid'];

        function init() {
            vm.wantToSee = false;
            vm.isUser = false;
            vm.isCritic = false;
            vm.isGuest = false;
            vm.stopRating = false;
            if(userId == 0) vm.isGuest = true;
            TvShowService
                .getTvByIdFromDb(tvId)
                .then(function (response) {
                    console.lof
                    if(response.data.numOfRatings)
                        vm.userAvgRating = (response.data.numOfRatings * 2) / response.data.totalRatings;
                }, function (err) {

                });
            UserService
                .findUserById(userId)
                .then(function (user) {
                    if(user.data)  {
                        vm.isUser = true;
                        var ratedTv = user.data.ratingsTv;
                        for(var t in ratedTv) {
                            if(ratedTv[t].id == tvId) {
                                vm.stars = ratedTv[t].rating;
                                vm.stopRating = true;
                            }
                        }
                    } else {
                        UserService
                            .findCriticById(userId)
                            .then(function (user) {
                                if(user) vm.isCritic = true;
                                else vm.isGuest = true;
                            }, function (err) {

                            });
                    }}, function (err) {

                });
            TvShowService
                .getTvDetails(tvId)
                .then(function (response) {
                    vm.tv = response.data;
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
            TvShowService
                .getSimilarTv(tvId)
                .then(function (response) {
                    vm.similarTv = response.data.results;
                });
            TvShowService
                .getWantToSeeTv(userId)
                .then(function (response) {
                    for(var tv in response.data) {
                        if(tvId == response.data[tv].id) {
                            vm.wantToSee = true;
                        }
                    }
                });
        }
        init();

        vm.goToPersonProfile = goToPersonProfile;
        vm.goToHomePage = goToHomePage;
        vm.goToTvPage = goToTvPage;
        vm.goToLoginOrProfile = goToLoginOrProfile;
        vm.addToWantToSee = addToWantToSee;
        vm.deleteToWantToSee = deleteToWantToSee;
        vm.rateThis = rateThis;
        vm.goToReadReview = goToReadReview;
        vm.goToWriteReview = goToWriteReview;

        function goToLoginOrProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/' + userId + '/profile');
        }

        function goToPersonProfile(personId) {
            if(userId) $location.url("/" + userId + "/person/" + personId);
            else $location.url("/0/person/" + personId);
        }

        function goToHomePage() {
            if(!userId || userId==0)  $location.url("/");
            else $location.url('/' + userId );
        }

        function goToTvPage(tvId) {
            if(userId) $location.url("/" + userId + "/tv/" + tvId);
            else $location.url("/0/tv/" + tvId);
        }

        function addToWantToSee() {
            TvShowService
                .getTvDetails(tvId)
                .then(function (response) {
                    var tvDetails = response.data;
                    TvShowService
                        .addToWantToSee(userId, tvDetails)
                        .then(function (response) {
                            vm.wantToSee = true;
                        }, function (err) {
                        });
                });
        }

        function deleteToWantToSee() {
            TvShowService
                .deleteToWantToSee(userId, tvId)
                .then(function (response) {
                    vm.wantToSee = false;
                }, function (err) {
                });
        }

        function rateThis(stars, tv, isCritic) {
            UserService
                .updateUserRatingTv(userId,tv,stars,isCritic)
                .then(function (response) {
                    TvShowService
                        .updateRatings(tv,stars)
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

        function goToReadReview(tvId) {
            $location.url("/" + userId + "/read-review/" + tvId);
        }

        function goToWriteReview(tvId) {
            $location.url("/" + userId + "/write-review/" + tvId);
        }
    }

})();