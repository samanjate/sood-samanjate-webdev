(function () {
    angular
        .module('GoMovies')
        .controller('EditProfileController', editProfileController);

    function editProfileController($location, $routeParams, $rootScope, UserService) {
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
                        vm.isCritic = false;
                    } else {
                        UserService
                            .findCriticById(userId)
                            .success(function (user) {
                                vm.user = user;
                                vm.isCritic = true;
                            });
                    }

                });
        }

        init();

        vm.updateProfile = updateProfile;
        vm.goToHomePage = goToHomePage;
        vm.goBack = goBack;

        function goBack() {
            $location.url("/profile");
        }

        function goToHomePage() {
            $location.url('/');
        }

        function updateProfile(newUser, isCritic) {
            UserService
                .updateUser(userId, newUser, isCritic)
                .success(function (user) {
                    $location.url("/profile");
                });
        }
    }
})();