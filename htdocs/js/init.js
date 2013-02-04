if (! this.todo) this.todo = {};

/**
 * Required: todo.client
 * Required: model
 */
(function($, __global__) {

    var   client = todo.client
        , userId = 1 //TODO: Get userId from Cookies
        , Task = Model.create();
        ;

      Task.attribute = ['name', 'description', 'checked'];

    $(function() {

        // Get user's task list
        var taskAjax = $.getJSON('/api/task/' + userId + '/', function(data) {
            if (client.success(data)) {
                Task.populate(data.body);
            }
        });

        $.when(taskAjax).done(function() {
            // renderer
            $('#task-tmpl').tmpl(Task.toArray()).appendTo('#todo-inner ul');
        });
    });
})(this.jQuery, this);

