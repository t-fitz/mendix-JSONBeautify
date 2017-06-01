/*global logger*/
/*
    WidgetName
    ========================

    @file      : jsonBeautify.js
    @version   : 2.0
    @author    : Trevor Fitzgerald
    @date      : 25/05/2017
    @copyright : Dun and Bradstreet
    @license   : Apache 2.0

    Documentation
    ========================
    A widget to prettify a JSON string
*/

define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "dojo/_base/lang",

    "dojo/text!jsonbeautify/lib/assets/jsonbeautify.html"
], function (declare, _WidgetBase, _TemplatedMixin, lang, template) {
    "use strict";

    return declare("jsonbeautify.lib.jsonbeautify", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: template,

        // Parameters configured in the Modeler.
        entityValue     : null,
        attributeValue  : null,
        processPath     : true,
        prettyPrint     : true,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _contextObj: null,

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            logger.debug(this.id + ".postCreate");
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;

            this._resetSubscriptions();
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },



        // code adapted from https://github.com/dojo/gfx/blob/master/demos/beautify.html
        beautify: function() 
        {
            var ta = this.txtJson;
            var t = this._contextObj.get(this.attributeValue);
            var v = JSON.parse(t);
        
            if (this.processPath) {
                this.trimPath(v);
            }

            ta.value = JSON.stringify(v, null, this.prettyPrint ? "    " : null);
        },

        trimPath: function(o) 
        {
            if (o instanceof Array) {
                for (var i = 0; i < o.length; ++i) {
                    this.trimPath(o[i]);
                }
                return;
            }

            if (("shape" in o) && ("path" in o.shape)) {
                o.shape.path = o.shape.path.replace(/\s\s+/g, " ").trim();
            }

            if ("children" in o) {
                this.trimPath(o.children);
            }
        },

        // Rerender the interface.
        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj != null)
            {   
                this.beautify();
            }
            else
            {
                console.log(this.id + ".applyContext received empty context");
            }

            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            this._executeCallback(callback, "_updateRendering");
        },

        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        },

        // Reset subscriptions.
        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");
            // Release handles on previous object, if any.
            this.unsubscribeAll();

            // When a mendix object exists create subscribtions.
            if (this._contextObj) {
                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });

                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    attr: this.backgroundColor,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        this._updateRendering();
                    })
                });

                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    val: true,
                    callback: lang.hitch(this, this._handleValidation)
                });
            }
        }


    });
});

// add css file to the widget
mxui.dom.addCss(require.toUrl("jsonbeautify/lib/assets/css/jsonbeautify.css"));

require(["jsonbeautify/lib/jsonbeautify"]);