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
        }
        init();

        vm.goToPersonProfile = goToPersonProfile;
        vm.goToHomePage = goToHomePage;
        vm.goToTvPage = goToTvPage;

        function goToPersonProfile(personId) {
            if(userId) $location.url("/" + userId + "/person/" + personId);
            else $location.url("/0/person/" + personId);
        }

        function goToHomePage() {
            $location.url("/");
        }

        function goToTvPage(tvId) {
            if(userId) $location.url("/" + userId + "/tv/" + tvId);
            else $location.url("/0/tv/" + tvId);
        }
    }

})();