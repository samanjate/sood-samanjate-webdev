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
            "getPersonById" : getPersonById,
            "checkIfAlreadyReviewed": checkIfAlreadyReviewed,
            "publishReview" : publishReview,
            "findReviews": findReviews,
            "findCriticReviews": findCriticReviews
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

        function publishReview(review) {
            return $http.post('/api/publish/', review);
        }

        function checkIfAlreadyReviewed(id, criticId) {
            return $http.get('/api/check?id='+id+"&criticId="+criticId);
        }

        function findReviews(eId) {
            return $http.get('/api/reviews?eId='+eId);
        }

        function findCriticReviews(userId) {
            return $http.get('/api/reviews?uid='+userId);
        }
    }

})();