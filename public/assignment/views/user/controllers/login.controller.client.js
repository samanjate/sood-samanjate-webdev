(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
    
    function loginController($location, UserService) {
        var vm = this;

        function init() {
        }
        init();

        // event handlers
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username,user.password);
            promise
                .success(function (user) {
                if(user) {
                    $location.url("/user/" + user._id);
                }
            })
                .error(function (error) {
                    vm.error = "User not found";
                    return null;
                });

        }
    }

})();