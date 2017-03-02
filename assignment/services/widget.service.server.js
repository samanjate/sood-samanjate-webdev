module.exports = function (app) {

    var multer = require('multer');
    var fs = require('fs');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

    app.post("/api/user/:uid/website/:wid/page/:pid/widget/new/", createWidget);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/", findWidgetByPageId);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid/", findWidgetById);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/new/", findDistinctWidget);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid/",updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wgid/", deleteWidget);
    app.put("/api/user/page/:pid/", updateWidgetPosition);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    
    function createWidget(req, res) {
        var pageId = req.params.pid;
        var newWidget = req.body;
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.sendStatus(200);
        return;
    }
    
    function findWidgetByPageId(req, res) {
        var pageId = req.params.pid;
        var allWidgets = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                allWidgets.push(widgets[w]);
            }
        }
        res.json(allWidgets);
    }
    
    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
            }
        }
    }

    function findDistinctWidget(req, res) {
        // var userId = req.params.uid;
        // var webId = req.params.wid;
        // var pageId = req.params.pid;
        // var distinctWidgets = [];
        // for(var w in widgets) {
        //     if(!distinctWidgets.includes(widgets[w].widgetType)) {
        //         distinctWidgets.push(widgets[w].widgetType);
        //     }
        // }
        // res.json(distinctWidgets);
    }
    
    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var newWidget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId ) {
                widgets[w] = newWidget;
                res.json(newWidget);
            }
        }
    }
    
    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                var index = widgets.indexOf(widgets[w]);
                if(index > -1) {
                    widgets.splice(index,1);
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404);
    }

    function updateWidgetPosition(req, res) {

        var pageId = req.params.pid;
        var initialIndex = parseInt(req.query.initial);
        var finalIndex = parseInt(req.query.final);

        var allWidgets = widgets.filter(function (widget) {
            return widget.pageId == pageId;
        });

        widgets = widgets.filter(function (w) {
            return allWidgets.indexOf(w) < 0;
        });

        var element = allWidgets[initialIndex];
        allWidgets.splice(initialIndex, 1);
        allWidgets.splice(finalIndex, 0, element);

        widgets = widgets.concat(allWidgets);
        res.sendStatus(200);
    }

    function uploadImage(req, res) {

        var uid = req.body.uid;
        var wid = req.body.wid;
        var wgid = req.body.wgid;

        var newFile = req.file;
        imgWidget = widgets.find(function (i) {
            return i._id == wgid;
        });
        if (imgWidget.url) {
            fs.unlink(uploadsFolderPath + "/" + imgWidget["fileName"], function () {
            });
        }
        imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + newFile.filename;
        imgWidget["fileName"] = newFile.filename;
        res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + imgWidget.pageId + "/widget");
    }

}