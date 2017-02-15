(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $location) {
        var vm = this;
        var userId = $routeParams['uid'];

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
        }
        init();

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.websiteList = websiteList;

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user != null) {
                vm.message = "User Successfully Updated!"
            } else {
                vm.error = "Unable to update user";
            }
        }

        function deleteUser() {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

        function websiteList() {
            $location.url("/user/"+userId+"/website");
        }
    }
})();