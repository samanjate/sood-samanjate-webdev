(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        
        return api;
        
        function createUser(user) {
            for(var u in users) {
                if(users[u].username === user.username) {
                    return null;
                }
            }
            user.firstName = null;
            user.lastName = null;
            user._id = Math.floor(Math.random() * 999);
            users.push(user);
            return user;
        }
        
        function findUserById(userId) {
            for(var u in users) {
                if(users[u]._id == userId) {
                    return users[u];
                }
            }
            return null;
        }
        
        function findUserByUsername(username) {
            for(var u in users) {
                if(users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }
        
        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
        
        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }
        
        function deleteUser(userId) {
            var index = users.indexOf(findUserById(userId));
            if (index > -1) {
                users.splice(index, 1);
            }
        }
    }
})();