(function () {
    angular
        .module("GoMovies")
        .factory("TvShowService", TvShowService);

    function TvShowService($http) {

        var baseUrl = 'https://api.themoviedb.org/3/';
        var key = 'fa1d97a5a35846c3b2e7f28f84c36675';
        var language = 'en-US';

        var api = {
            "topRatedTvShows" : topRatedTvShows,
            "latestTvShows" : latestTvShows,
            "airingNow" : airingNow,
            "getTvDetails" : getTvDetails,
            "getSimilarTv" : getSimilarTv,
            "getWantToSeeTv": getWantToSeeTv,
            "addToWantToSee": addToWantToSee,
            "deleteToWantToSee": deleteToWantToSee
        };

        return api;

        function topRatedTvShows() {
            var url = baseUrl + 'tv/top_rated?api_key='+ key + '&language='+ language + '&page=1';
            return $http.get(url);
        }

        function latestTvShows() {
            var url = baseUrl + 'tv/popular?api_key=' + key + '&language=' + language + '&page=1';
            return $http.get(url);
        }
        
        function airingNow() {
            var url = baseUrl + 'tv/airing_today?api_key='+key+'&language='+language+'&page=1';
            return $http.get(url);
        }

        function getTvDetails(tvId) {
            var tags = 'videos,credits,reviews';
            var url = baseUrl + 'tv/'+tvId+'?api_key='+key+'&language='+language+'&append_to_response='+ tags;
            return $http.get(url);
        }

        function getSimilarTv(tvId) {
            var url = baseUrl + 'tv/'+tvId+'/similar?api_key='+key+'&language='+language+'&page=1';
            return $http.get(url);
        }

        function getWantToSeeTv(userId) {
            return $http.get("/api/audience/wtstv/"+userId);
        }

        function addToWantToSee(userId, tv) {
            return $http.post("/api/audience/wtstv/"+userId,tv);
        }

        function deleteToWantToSee(userId, tvId) {
            return $http.delete("/api/audience/wtstv/"+userId+'?tid='+ tvId);
        }
    }

})();