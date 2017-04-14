(function () {
    angular
        .module('GoMovies')
        .controller('ProfileController', profileController);

    function profileController($location, $routeParams, UserService, MovieService, TvShowService, SearchService) {
        var vm = this;

        var userId = $routeParams['uid'];

        vm.posterNotFound = 'http://s3.amazonaws.com/static.betaeasy.com/screenshot/456/456-25984-14192637741419263774.42.jpeg';
        vm.defaultProfilePic = 'http://www.racialjusticenetwork.co.uk/wp-content/uploads/2016/12/default-profile-picture.png';

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user) {
                        vm.user = user;
                        var allRatings = user.ratings.concat(user.ratingsTv);
                        vm.ratingHistory = allRatings.sort(function (a,b) {
                           return b.rating - a.rating;
                        });
                        vm.isCritic = false;
                    } else {
                        UserService
                            .findCriticById(userId)
                            .success(function (user) {
                                vm.user = user;
                                vm.isCritic = true;
                                SearchService
                                    .findCriticReviews(userId)
                                    .success(function (reviews) {
                                       vm.reviews = reviews;
                                    });
                            });
                    }

                });
            MovieService
                .getWantToSeeMovies(userId)
                .success(function (movies) {
                    vm.wantToSeeMovies = movies.reverse();
                });
            TvShowService
                .getWantToSeeTv(userId)
                .success(function (tv) {
                    vm.wantToSeeTv = tv.reverse();
                });
        }

        init();

        vm.tabs = [{active: true}, {active: false}, {active: false}];

        vm.goToEditProfile = goToEditProfile;
        vm.goToHomePage = goToHomePage;
        vm.goToMoviePage = goToMoviePage;
        vm.goToTvPage =goToTvPage;
        vm.goToPage = goToPage;
        vm.logout = logout;

        function logout() {
            $location.url("/");
        }

        function goToHomePage() {
            if(!userId || userId ==0)  $location.url("/");
            else $location.url('/' + userId );
        }

        function goToEditProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/' + userId + '/edit-profile');
        }

        function goToMoviePage(movieId) {
            if(!userId || userId==0) $location.url('/0/movie/'+movieId);
            else $location.url('/' + userId + '/movie/'+movieId);
        }

        function goToTvPage(tvId) {
            if(!userId || userId==0) $location.url('/0/tv/'+tvId);
            else $location.url('/' + userId + '/tv/'+tvId);
        }

        function goToPage(obj) {
            if(!userId || userId==0) $location.url('/0/tv/'+tvId);
            else if(obj.original_name) $location.url('/' + userId + '/tv/'+obj.id);
            else $location.url('/' + userId + '/movie/'+obj.id);
        }


    }
})();