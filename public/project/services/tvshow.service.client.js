(function () {
    angular
        .module("GoMovies")
        .factory("TvShowService", TvShowService);

    function TvShowService($http) {

        var key = 'fa1d97a5a35846c3b2e7f28f84c36675';
        var language = 'en-US';

        var api = {
            "topRatedTvShows" : topRatedTvShows
        };

        return api;

        function topRatedTvShows() {
            var url = 'https://api.themoviedb.org/3/tv/top_rated?api_key='+ key + '&language='+ language + '&page=1';
            return $http.get(url);
        }
    }

})();