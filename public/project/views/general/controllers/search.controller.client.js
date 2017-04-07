(function () {
    angular
        .module("GoMovies")
        .controller("SearchController", searchController);

    function searchController($routeParams, SearchService) {
        var vm = this;
        vm.keyword = $routeParams.keyword;
        vm.genre = $routeParams.genre;

        function init() {
            if(vm.genre) {
                SearchService
                    .getMoviesByGenre(vm.genre)
                    .then(function (response) {
                        vm.people = [];
                        vm.tv = [];
                        vm.other = [];
                        vm.movies = response.data.results;
                    })
            } else {
                SearchService
                    .getSearchResults(vm.keyword)
                    .then(function (response) {
                        vm.results = response.data.results;
                        vm.movies = [];
                        vm.people = [];
                        vm.tv = [];
                        vm.other = [];
                        for(var r in vm.results) {
                            if(vm.results[r].media_type == 'movie') vm.movies.push(vm.results[r]);
                            else if(vm.results[r].media_type == 'person') vm.people.push(vm.results[r]);
                            else if(vm.results[r].media_type == 'tv') vm.tv.push(vm.results[r]);
                            else vm.other.push(vm.results[r]);
                        }
                    })
            }

        }
        init();

    }

})();