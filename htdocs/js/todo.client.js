if (! this.todo) this.todo = {};

(function($, __global__) {

    var slice = Array.prototype.slice;
    var errors = {
        unknown: 'ServerError'
    };

    /**
     * Request to todo-api
     *
     * @param {Object}     Options for Request
     *     url:        APIのURL
     *     data:       todo-apiに送るパラメータ
     *     callback:   コールバック関数
     *     method:     RequestMethod
     */
    var request = function(options) {
        var self = this;

        $.ajax({
            cache: false,
            type: options.method || 'GET',
            success: function(data) {
                if (self.successToRequest(data)) {
                    options.callback(data.body);
                    return;
                }

                self.errorHandler(data.header && data.header.message);
            },
            error: function(msg) {
                self.errorHandler();
                callback(false);
            }
        });
    };

    __global__.todo.client = {

        get: function() {
            var args = slice.apply(arguments, [0,3]);
            return request.apply(this, args);
        },

        post: function() {
            var args = slice.apply(arguments, [0,3]);
            args.push('POST');
            return request.apply(this, args);
        },

        put: function() {
            var args = slice.apply(arguments, [0,3]);
            args.push('PUT');
            return request.apply(this, args);
        },

        success: function(data) {
            return data.header && data.header.status === 'ok';
        },

        errorHandler: function(msg) {

        }
    };


}) (this.jQuery, this);
