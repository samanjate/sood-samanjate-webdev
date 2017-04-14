(function () {
    angular
        .module("GoMovies")
        .controller("RReviewController", reviewController);

    function reviewController($location, $routeParams, MovieService, TvShowService, SearchService) {
        var vm = this;

        vm.posterNotFound = 'http://s3.amazonaws.com/static.betaeasy.com/screenshot/456/456-25984-14192637741419263774.42.jpeg';

        var userId = $routeParams['uid'];
        var eId = $routeParams['eid'];

        function init() {
            MovieService
                .getMovieById(eId)
                .success(function (response) {
                    if(response) {
                        vm.movie = response;
                    }
                })
                .error(function (err) {
                    TvShowService
                        .getTvDetails(eId)
                        .then(function (response) {
                            console.log(response);
                            if(response) {
                                vm.tv = response;
                            }
                        });
                });
            SearchService
                .findReviews(eId)
                .then(function (response) {
                    if(response.data) {
                        vm.reviews = response.data;
                    } else {
                        vm.reviews = [];
                    }
                })

        }

        init();

        vm.goToHomePage = goToHomePage;
        vm.goToMoviePage = goToMoviePage;
        vm.goToTvPage = goToTvPage;

        function goToHomePage() {
            if(!userId || userId==0)  $location.url("/");
            else $location.url('/' + userId );
        }

        function goToMoviePage() {
            if(!userId || userId==0)  $location.url("/0/movie/"+eId);
            else $location.url('/' + userId +"/movie/"+eId);
        }

        function goToTvPage() {
            if(!userId || userId==0)  $location.url("/0/tv/"+eId);
            else $location.url('/' + userId +"/tv/"+eId);
        }

    }

})();