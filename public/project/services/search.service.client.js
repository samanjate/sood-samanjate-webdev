(function () {
    angular
        .module("GoMovies")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        var baseUrl = 'https://api.themoviedb.org/3/';
        var key = 'fa1d97a5a35846c3b2e7f28f84c36675';
        var language = 'en-US';

        var api = {
            "getSearchResults" : getSearchResults,
            "getMoviesByGenre" : getMoviesByGenre,
            "getPersonById" : getPersonById
        };

        return api;

        function getSearchResults(keyword) {
            var url = baseUrl + 'search/multi?api_key='+key+'&language='+language+'&query='+keyword+'&page=1&include_adult=false';
            return $http.get(url);
        }

        function getMoviesByGenre(id) {
            var url = baseUrl + 'genre/'+id+'/movies?api_key='+key+'&language='+language+'&include_adult=false&sort_by=created_at.asc';
            return $http.get(url);
        }

        function getPersonById(personId) {
            var tags = 'images,movie_credits,tv_credits';
            var url = baseUrl + 'person/'+personId+'?api_key='+key+'&language='+language+'&append_to_response=' + tags;
            return $http.get(url);
        }
    }

})();