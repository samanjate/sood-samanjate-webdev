module.exports = function (app,widgetModel) {

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
    
    function createWidget(req, res) {
        var pageId = req.params.pid;
        var widget = req.body;
        var newWidget = {};
        switch (widget.type){
            case "HEADER":
                newWidget = {
                    type: widget.type,
                    size: widget.size,
                    text: widget.text};
                break;
            case "HTML":
                newWidget = {
                    type: widget.type,
                    text: widget.text};
                break;
            case "IMAGE":
                newWidget = {
                    type: widget.type,
                    width: widget.width,
                    url: widget.url};
                break;
            case "YOUTUBE":
                newWidget = {
                    type: widget.type,
                    width: widget.width,
                    url: widget.url};
                break;
            case "TEXT":
                newWidget = {
                    type: widget.type,
                    text: widget.text,
                    rows: widget.rows,
                    placeholder: widget.placeholder,
                    formatted: widget.formatted};
                break;
        }
        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    
    function findWidgetByPageId(req, res) {
        var pageId = req.params.pid;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    
    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
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
        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(function (response) {
                    if(response.ok == 1 && response.n == 1){
                        res.sendStatus(200);
                    }
                    else{
                        res.sendStatus(404);
                    }
                },
                function (err) {
                    res.sendStatus(404);
                })
    }
    
    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deleteUploadedImage(imageUrl) {
        if(imageUrl && imageUrl.search('http') == -1){
            fs.unlink(publicDirectory+imageUrl, function (err) {
                if(err){
                    console.log(err);
                    return;
                }
            });
        }
    }

    function updateWidgetPosition(req, res) {

        var pageId = req.params.pid;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        widgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function (response) {
                res.sendStatus(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function uploadImage(req, res) {

        var widgetId = req.body.wgid;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var width = req.body.width;
        var pageId = req.body.pid;
        var myFile = req.file;
        var imageWidget = {
            width: width,
            _id: widgetId
        };


        if (imageWidget.url) {
            fs.unlink(uploadsFolderPath + "/" + imageWidget["fileName"], function () {
            });
        }

        imageWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

        imageWidget["fileName"] = myFile.filename;

        widgetModel
            .updateWidget(widgetId, imageWidget)
            .then(function(response) {
                if (response.ok == 1 && response.n == 1) {
                    res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + pageId + "/widget");
                }
                else {
                    res.sendStatus(404);
                }
            }, function(err){
                res.sendStatus(404);
            })
    }

}