(function () {
    angular
        .module('GoMovies')
        .controller('RegisterController', registerController);

    function registerController($location, $rootScope, UserService) {
        var vm = this;

        function init() {
            vm.user = {};
        }

        init();

        vm.goToHomePage = goToHomePage;
        vm.register = register;

        function goToHomePage() {
            $location.url("/");
        }

        function register(user) {
            if(!user || !user.username || !user.password || !user.cpassword) {
                vm.error = "Please provide useranme and password"
            } else if(user.password != user.cpassword) {
                vm.error = "Passwords do not match"
            } else if(vm.isCritic) {
                UserService
                    .findCriticByUsername(user.username)
                    .success(function (user) {
                        vm.error = "Username already exists."
                    })
                    .error(function (response) {
                        UserService
                            .createUser(user,vm.isCritic)
                            .success(function (user) {
                                $rootScope.currentUser = user;
                                $location.url("/profile");
                            });
                    });
            } else {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.error = "Username already exists."
                    })
                    .error(function (response) {
                        UserService
                            .createUser(user,vm.isCritic)
                            .success(function (user) {
                                $location.url("/profile");
                            });
                    });
            }

        }
    }
})();