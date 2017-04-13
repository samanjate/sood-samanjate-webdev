(function () {
    angular
        .module("GoMovies")
        .controller("TvController", tvController);

    function tvController($sce, $location, $routeParams, TvShowService) {
        var vm = this;

        var userId = $routeParams['uid'];
        var tvId = $routeParams['tid'];

        function init() {
            TvShowService
                .getTvDetails(tvId)
                .then(function (response) {
                    vm.tv = response.data;
                    vm.cast = response.data.credits.cast;
                    vm.trailers = [];
                    if (response.data.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        for(var t in response.data.videos.results) {
                            var trailer = {};
                            trailer.video_path = $sce.trustAsResourceUrl(embedUrl + response.data.videos.results[t].key);
                            trailer.untrusted_video_url = embedUrl + response.data.videos.results[t].key;
                            vm.trailers.push(trailer);
                        }
                    }
                });
            TvShowService
                .getSimilarTv(tvId)
                .then(function (response) {
                    vm.similarTv = response.data.results;
                });
            TvShowService
                .getWantToSeeTv(userId)
                .then(function (response) {
                    for(var tv in response.data) {
                        if(tvId == response.data[tv].id) {
                            vm.wantToSee = true;
                        }
                    }
                });
        }
        init();

        vm.goToPersonProfile = goToPersonProfile;
        vm.goToHomePage = goToHomePage;
        vm.goToTvPage = goToTvPage;
        vm.goToLoginOrProfile = goToLoginOrProfile;
        vm.addToWantToSee = addToWantToSee;
        vm.deleteToWantToSee = deleteToWantToSee;

        function goToLoginOrProfile() {
            if(!userId || userId==0) $location.url('/login');
            else $location.url('/' + userId + '/profile');
        }

        function goToPersonProfile(personId) {
            if(userId) $location.url("/" + userId + "/person/" + personId);
            else $location.url("/0/person/" + personId);
        }

        function goToHomePage() {
            if(!userId || userId==0)  $location.url("/");
            else $location.url('/' + userId );
        }

        function goToTvPage(tvId) {
            if(userId) $location.url("/" + userId + "/tv/" + tvId);
            else $location.url("/0/tv/" + tvId);
        }

        function addToWantToSee() {
            TvShowService
                .getTvDetails(tvId)
                .then(function (response) {
                    var tvDetails = response.data;
                    TvShowService
                        .addToWantToSee(userId, tvDetails)
                        .then(function (response) {
                            vm.wantToSee = true;
                        }, function (err) {
                        });
                });
        }

        function deleteToWantToSee() {
            TvShowService
                .deleteToWantToSee(userId, tvId)
                .then(function (response) {
                    vm.wantToSee = false;
                }, function (err) {
                });
        }
    }

})();