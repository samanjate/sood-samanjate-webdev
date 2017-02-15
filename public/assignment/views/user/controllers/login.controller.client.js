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
            var user = UserService.findUserByCredentials(user.username,user.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }

})();