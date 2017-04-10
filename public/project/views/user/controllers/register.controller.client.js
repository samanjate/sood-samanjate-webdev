(function () {
    angular
        .module('GoMovies')
        .controller('RegisterController', registerController);

    function registerController($location) {
        var vm = this;

        function init() {

        }

        init();

        vm.goToHomePage = goToHomePage;

        function goToHomePage() {
            $location.url("/");
        }
    }
})();