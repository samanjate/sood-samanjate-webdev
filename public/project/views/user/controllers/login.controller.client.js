(function () {
    angular
        .module('GoMovies')
        .controller('LoginController', loginController);

    function loginController($location, UserService) {
        var vm = this;

        function init() {

        }

        init();

        vm.goToHomePage = goToHomePage;
        vm.goToRegisterPage = goToRegisterPage;
        vm.login = login;

        function goToHomePage() {
            $location.url("/");
        }

        function goToRegisterPage() {
            $location.url("/register");
        }

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password, vm.isCritic)
                .success(function (user) {
                    if(user) {
                        $location.url("/"+user._id+"/profile");
                    }
                })
                .error(function (error) {
                    vm.error = "User not found";
                    return null;
                });
        }
    }
})();