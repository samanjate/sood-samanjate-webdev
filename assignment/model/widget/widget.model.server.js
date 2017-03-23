module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
    var fs = require("fs");
    var publicDirectory =__dirname+"/../../../public";

    var api = {
        "createWidget":createWidget,
        "findAllWidgetsForPage":findAllWidgetsForPage,
        "findWidgetById":findWidgetById,
        "updateWidget":updateWidget,
        "deleteWidget":deleteWidget,
        "deleteWidgetOfPage":deleteWidgetOfPage,
        "reorderWidget":reorderWidget,
        "setModel":setModel
    };

    return api;

    function deleteUploadedImage(imageUrl) {
        if(imageUrl && imageUrl.search('http') == -1){
            fs.unlink(publicDirectory+imageUrl, function (err) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log('successfully deleted '+publicDirectory+imageUrl);
            });
        }
    }

    function createWidget(pageId, newWidget){
        return WidgetModel
            .create(newWidget)
            .then(function (widget) {
                return model
                    .pageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        widget._page = page._id;
                        page.widgets.push(widget._id);
                        widget.save();
                        page.save();
                        return widget;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function getWidgetsRecursively(count, widgetsOfPage, widgetCollectionForPage) {
        if(count == 0){
            return widgetCollectionForPage;
        }

        return WidgetModel.findById(widgetsOfPage.shift()).select('-__v')
            .then(function (widget) {
                widgetCollectionForPage.push(widget);
                return getWidgetsRecursively(--count, widgetsOfPage, widgetCollectionForPage);
            }, function (err) {
                return err;
            });
    }
    function findAllWidgetsForPage(pageId){
        return model.pageModel
            .findPageById(pageId)
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                var numberOfWidgets = widgetsOfPage.length;
                var widgetCollectionForPage = [];
                return getWidgetsRecursively(numberOfWidgets, widgetsOfPage, widgetCollectionForPage);
            }, function (err) {
                return err;
            });
    }
    function findWidgetById(widgetId){
        return WidgetModel.findById(widgetId).select('-__v');
    }
    function updateWidget(widgetId, updatedWidget){
        return WidgetModel.update({_id:widgetId},{$set: updatedWidget});
    }
    function deleteWidget(widgetId){
        return WidgetModel.findById(widgetId).populate('_page').then(function (widget) {
            widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId),1);
            widget._page.save();
            if(widget.type == "IMAGE"){
                deleteUploadedImage(widget.url);
            }
            return WidgetModel.remove({_id:widgetId});
        }, function (err) {
            return err;
        });
    }

    function deleteWidgetOfPage(widgetId) {
        return WidgetModel.findById(widgetId)
            .then(function (widget) {
                if(widget.type == "IMAGE"){
                    deleteUploadedImage(widget.url);
                }
                return WidgetModel.remove({_id: widgetId});
            }, function (err) {
                return err;
            });
    }

    function reorderWidget(pageId, start, end) {
        return model.pageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                page.save();
                return 200;
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};