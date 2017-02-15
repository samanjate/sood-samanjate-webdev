(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        function init() {

        }
        init();

        // event handlers
        vm.register = register;

        function register(user) {
            var nuser = UserService.createUser(user);
            if(nuser) {
                $location.url("/user/" + nuser._id);
            } else {
                vm.error = "User already exists";
            }
        }
    }

})();