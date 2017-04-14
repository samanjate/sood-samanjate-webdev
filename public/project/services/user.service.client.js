(function () {
    angular
        .module("GoMovies")
        .factory("UserService", UserService);
    function UserService($http) {

        var api = {
            "createUser" : createUser,
            "findUserById": findUserById,
            "findCriticById": findCriticById,
            "findUserByUsername": findUserByUsername,
            "findCriticByUsername": findCriticByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUserRating": updateUserRating,
            "updateUserRatingTv": updateUserRatingTv,
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

        function findUserByCredentials(username, password, isCritic) {
            if(isCritic) return $http.get("/api/critic?username="+username+"&password="+password);
            else return $http.get("/api/audience?username="+username+"&password="+password);
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

    }
})();