(function () {
    angular
        .module("GoMovies")
        .controller("WReviewController", reviewController);

    function reviewController($location, $routeParams, MovieService, TvShowService, SearchService, UserService) {
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
                            if(response) {
                                vm.tv = response;
                            }
                        });
                });
            SearchService
                .checkIfAlreadyReviewed(eId,userId)
                .then(function (response) {
                    if(response.data) vm.alreadyReview = true;
                }, function (err) {

                });
            UserService
                .findCriticById(userId)
                .then(function (user) {
                    console.log(user);
                    vm.user = user.data;
                });
        }

        init();

        vm.postReview = postReview;
        vm.goToHomePage = goToHomePage;
        vm.goBack = goBack;

        function goToHomePage() {
            if(!userId || userId==0)  $location.url("/");
            else $location.url('/' + userId );
        }

        function goBack(tv) {
            if(tv != null) $location.url('/' + userId + '/tv/' + eId);
            else $location.url('/' + userId + '/movie/' + eId);
        }

        function postReview(r, tv, movie, rating, user) {
            if(!r || !rating) {
                vm.error = "Oops! You forgot something";
                return;
            }
            var review = {};
            if(user.firstName == null && user.lastName == null) {
                vm.error = "Please update your profile."
                return;
            }
            review.criticName = user.firstName + " " + user.lastName;
            review.review = r;
            review.criticId = userId;
            review.id = eId;
            review.rating = rating;
            if(movie != null) {
                review.type = 'movie';
                review.name = movie.original_title;
                review.poster_path = movie.poster_path;
            }
            else if(tv != null) {
                review.type = 'tv';
                review.name = tv.original_name;
                review.poser_path = tv.poster_path;
            }
            SearchService
                .publishReview(review)
                .then(function (response) {
                    if(response.data.type == 'tv') $location.url('/' + userId + '/tv/' + eId);
                    else $location.url('/' + userId + '/movie/' + eId);
                }, function (err) {
                    vm.error = "Some Error occurred"
                });
        }


    }

})();