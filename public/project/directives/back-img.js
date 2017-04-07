(function () {
    angular
        .module('GoMovies')
        .directive('backImg', backgroundImg);

    function backgroundImg() {
        function linkFunc(scope, element, attrs) {
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover'
            });
        }
        return {
            link: linkFunc
        };
    }
})();