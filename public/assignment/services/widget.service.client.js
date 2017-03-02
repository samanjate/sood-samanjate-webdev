(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget,
            "findDistinctWidget" : findDistinctWidget,
            "updateWidgetPosition" : updateWidgetPosition
        };

        return api;

        function createWidget(userId, webId, pageId, newWidget) {
            return $http.post("/api/user/"+userId+"/website/"+webId+"/page/"+pageId+"/widget/new/", newWidget);
        }

        function findWidgetsByPageId(userId, websiteId, pageId) {
            return $http.get("/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/");
        }

        function findWidgetById(userId, websiteId, pageId, widgetId) {
            return $http.get("/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }

        function updateWidget(userId, webId, pageId, widgetId, newWidget) {
            return $http.put("/api/user/"+userId+"/website/"+webId+"/page/"+pageId+"/widget/"+widgetId, newWidget);
        }

        function deleteWidget(userId, webId, pageId, widgetId) {
            return $http.delete("/api/user/"+userId+"/website/"+webId+"/page/"+pageId+"/widget/" + widgetId);
        }
        
        function findDistinctWidget(userId, webId, pageId) {
            //return $http.get("/api/user/"+userId+"/website/"+webId+"/page/"+pageId+"/widget/new/");
        }

        function updateWidgetPosition(pageId,initialIndex,finalIndex) {
            return $http.put("/api/user/page/"+pageId+"?initial=" + initialIndex + "&final=" + finalIndex);
        }
    }
})();