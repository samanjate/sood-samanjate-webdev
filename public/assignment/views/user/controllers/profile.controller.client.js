(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $location) {
        var vm = this;
        var userId = $routeParams['uid'];

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
            });
        }
        init();

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.websiteList = websiteList;

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user != null) {
                        vm.message = "User Successfully Updated!"
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(userId)
                .success(function () {
                });
            $location.url("/login");
        }

        function websiteList() {
            $location.url("/user/"+userId+"/website");
        }
    }
})();