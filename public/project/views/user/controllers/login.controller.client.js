(function () {
    angular
        .module('GoMovies')
        .controller('LoginController', loginController);

    function loginController($location, UserService, $rootScope) {
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
                .findUserByCredentials(user, vm.isCritic)
                .success(function (response) {
                    var user = response[0];
                    $rootScope.currentUser = user;
                    $location.url('/'+user._id+"/profile");
                })
                .error(function (error) {
                    vm.error = "User not found";
                    return null;
                });
        }
    }
})();