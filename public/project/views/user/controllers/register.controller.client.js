(function () {
    angular
        .module('GoMovies')
        .controller('RegisterController', registerController);

    function registerController($location, UserService) {
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
            if(vm.isCritic) {
                UserService
                    .findCriticByUsername(user.username)
                    .success(function (user) {
                        vm.error = "Username already exists."
                    })
                    .error(function (response) {
                        UserService
                            .createUser(user,vm.isCritic)
                            .success(function (user) {
                                $location.url("/"+user._id+"/profile");
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
                                $location.url("/"+user._id+"/profile");
                            });
                    });
            }

        }
    }
})();