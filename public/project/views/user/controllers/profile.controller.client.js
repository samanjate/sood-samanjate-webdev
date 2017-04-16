(function () {
    angular
        .module('GoMovies')
        .controller('ProfileController', profileController);

    function profileController($location, $rootScope, UserService, MovieService, TvShowService, SearchService) {
        var vm = this;

        if(!$rootScope.currentUser) {
            $location.url('/login');
        }
        var userId = $rootScope.currentUser._id;

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

        function logout(user) {
            UserService
                .logout(user)
                .then(function(){
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }

        function goToHomePage() {
            $location.url('/');
        }

        function goToEditProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/edit-profile');
        }

        function goToMoviePage(movieId) {
            $location.url('/movie/'+movieId);
        }

        function goToTvPage(tvId) {
            $location.url('/tv/'+tvId);
        }

        function goToPage(obj) {
            if(!userId || userId==0) $location.url('/tv/'+tvId);
            else if(obj.original_name) $location.url('/tv/'+obj.id);
            else $location.url('/movie/'+obj.id);
        }


    }
})();