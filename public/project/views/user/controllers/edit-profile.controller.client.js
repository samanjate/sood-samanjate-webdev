(function () {
    angular
        .module('GoMovies')
        .controller('EditProfileController', editProfileController);

    function editProfileController($location, $routeParams, UserService) {
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

        function goToHomePage() {
            if(!userId || userId==0)  $location.url("/");
            else $location.url('/' + userIriticd );
        }

        function updateProfile(newUser, isCritic) {
            UserService
                .updateUser(userId, newUser, isCritic)
                .success(function (user) {
                    $location.url("/"+user._id+"/profile");
                });
        }
    }
})();