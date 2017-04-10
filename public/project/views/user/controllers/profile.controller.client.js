(function () {
    angular
        .module('GoMovies')
        .controller('ProfileController', profileController);

    function profileController() {
        var vm = this;

        vm.posterNotFound = 'http://s3.amazonaws.com/static.betaeasy.com/screenshot/456/456-25984-14192637741419263774.42.jpeg';
        vm.defaultProfilePic = 'http://www.racialjusticenetwork.co.uk/wp-content/uploads/2016/12/default-profile-picture.png';

        function init() {

        }

        vm.tabs = [{active: true}, {active: false}, {active: false}, {active: false}];

        init();
    }
})();