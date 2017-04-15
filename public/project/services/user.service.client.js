(function () {
    angular
        .module("GoMovies")
        .factory("UserService", UserService);
    function UserService($http, $rootScope) {

        var api = {
            "createUser" : createUser,
            "findUserById": findUserById,
            "findCriticById": findCriticById,
            "findUserByUsername": findUserByUsername,
            "findCriticByUsername": findCriticByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUserRating": updateUserRating,
            "updateUserRatingTv": updateUserRatingTv,
            "setCurrentUser": setCurrentUser,
            "getCurrentUser": getCurrentUser,
            "logout": logout,
            "updateUser": updateUser
        };

        return api;

        function createUser(newUser, isCritic) {
            if(isCritic) return $http.post("/api/critic/", newUser);
            else return $http.post("/api/audience/", newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/audience/"+userId);
        }

        function findCriticById(userId) {
            return $http.get("/api/critic/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/audience?username="+username);
        }

        function findCriticByUsername(username) {
            return $http.get("/api/critic?username="+username);
        }

        function findUserByCredentials(user, isCritic) {
            if(isCritic) return $http.post("/api/login/critic",user);
            else return $http.post("/api/login/audience",user);
        }

        function updateUser(userId, newUser, isCritic) {
            if(isCritic) return $http.put("/api/critic/"+userId, newUser);
            else return $http.put("/api/audience/"+userId, newUser);
        }

        function updateUserRating(userId, movie, rating, isCritic) {
            if(isCritic) return $http.put("/api/critic/rate/"+userId+'?rate='+rating, movie);
            else return $http.put("/api/audience/rate/"+userId+'?rate='+rating, movie);
        }

        function updateUserRatingTv(userId, tv, rating, isCritic) {
            if(isCritic) return $http.put("/api/critic/ratetv/"+userId+'?rate='+rating, tv);
            else return $http.put("/api/audience/ratetv/"+userId+'?rate='+rating, tv);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            $http.get("/api/loggedin/critic")
                .success(function (user) {
                    return user;
                })
                .error(function (error) {
                    $http.get("/api/loggedin")
                        .success(function (user) {
                            return user;
                        })
                        .error(function (error) {
                            return error;
                        });
                });
        }

        function logout(user) {
            if(user.userType == 'critic') return $http.post("/api/logout/critic");
            else return $http.post("/api/logout/audience");

        }

    }
})();