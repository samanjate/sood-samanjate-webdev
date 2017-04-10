(function () {
    angular
        .module('GoMovies')
        .controller('LoginController', loginController);

    function loginController($location) {
        var vm = this;

        function init() {

        }

        init();

        vm.goToHomePage = goToHomePage;
        vm.goToRegisterPage = goToRegisterPage;

        function goToHomePage() {
            $location.url("/");
        }

        function goToRegisterPage() {
            $location.url("/register");
        }
    }
})();