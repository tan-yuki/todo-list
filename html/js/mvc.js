// Model
(function() {

    var Model = function() {
        this.init.apply(this, arguments);
    };

    Model.records = [];

    Model.attributes = ['id'];

    Model.create = function() {
        var _Model = function() {};
        _Model.prototype = new Model();
        _Model.parent = this;
        _Model.prototype.init.apply(_Model.prototype, arguments);
    };

    Model.find = function(id) {
        return records[id];
    };

    Model.destroy = function(id, callback) {
        $.post(Model.destroyUrl, {"id": id}, callback);
        delete records[id];
    };

    Model.prototype = {
        parent: Model,

        init: function(options) {
            this.parent.attributes = $.merge(this.parent.attributes, options.attributes);

            this.parent.saveUrl = options.url.save;
            this.parent.destroyUrl = options.url.destroy;
        },

        attributes: function() {
            var parent = this.parent,
                attrs = parent.attributes;


        save: function(rec, callback) {
           this.records[rec.id] = rec;
           $.post(this.saveUrl, this.attributes(), callback);
        },

        destroy: function(id, callback) {
           delete records[id];
           $.post(this.destroyUrl, id, callback);
        }
    };
}) ();
