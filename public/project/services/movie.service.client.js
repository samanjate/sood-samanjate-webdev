(function () {
    angular
        .module("GoMovies")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var key = 'fa1d97a5a35846c3b2e7f28f84c36675';
        var language = 'en-US';

        var api = {
            "searchUpcomingMovies" : searchUpcomingMovies,
            "topRatedMovies" : topRatedMovies,
            "movieGenres" : movieGenres,
            "popularPeople" : popularPeople
        };

        return api;

        function searchUpcomingMovies() {
            var url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + key;
            return $http.get(url);
        }

        function topRatedMovies() {
            var url = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+ key + '&language='+ language + '&page=1';
            return $http.get(url);
        }

        function movieGenres() {
            var url = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+key+'&language='+language;
            return $http.get(url);
        }

        function popularPeople() {
            var url = 'https://api.themoviedb.org/3/person/popular?api_key='+key+'&language='+language+'&page=1';
            return $http.get(url);
        }
        
        function getPeopleById(id) {
            
        }
    }

})();