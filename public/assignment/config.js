(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("default", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "loginModel"
            })
            .when("/", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "loginModel"
            })
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: "loginModel"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "registerModel"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "profileController"

            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "websiteListModel"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "websiteNewModel"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "websiteEditModel"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "pageListModel"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "pageNewModel"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "pageEditModel"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "widgetListModel"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "WidgetChooserController",
                controllerAs: "widgetChooserModel"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/editors/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "widgetEditModel"
            })
    }
})();