(function () {
    angular
        .module("GoMovies")
        .controller("PersonController", personController);

    function personController($routeParams, $location, SearchService, $rootScope) {
        var vm = this;

        var userId = 0;
        if($rootScope.currentUser) userId = $rootScope.currentUser._id;
        var personId = $routeParams['pid'];

        function init() {
            SearchService
                .getPersonById(personId)
                .then(function (response) {
                    vm.person = response.data;
                });

        }
        init();

        vm.goToMoviePage = goToMoviePage;
        vm.goToHomePage = goToHomePage;
        vm.goToTvPage = goToTvPage;
        vm.goToLoginOrProfile = goToLoginOrProfile;

        function goToLoginOrProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/profile');
        }

        function goToMoviePage(movieId) {
            $location.url("/movie/" + movieId);
        }

        function goToTvPage(tvId) {
            $location.url("/tv/" + tvId);
        }

        function goToHomePage() {
            $location.url('/');
        }

    }

})();