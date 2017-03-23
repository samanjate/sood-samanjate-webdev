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
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = 'Username already taken';
                })
                .error(function (err) {
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            $location.url("/user/"+user._id);
                        });
                });
        }
    }

})();