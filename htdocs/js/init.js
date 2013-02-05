if (! this.todo) this.todo = {};

/**
 * Required: todo.client
 * Required: model
 */
(function($, __global__) {

    var   client = todo.client
        , userId = 1 //TODO: Get userId from Cookies
        , Task = Model.create()
        ;

    Task.attribute = ['name', 'description', 'checked'];

    Task.extend({
        render: function() {
            var $todoInner = $('#todo-inner')
            // renderer
            var html = $('#task-tmpl').tmpl(this.toArray());
            $todoInner.find('ul').html(html);
        },

    });

    var createStates = function() {
        var $todoInner = $('#todo-inner')
          , $taskList = $todoInner.find('li.task')
          , $taskTmpl = $('#task-tmpl')

        // Create StateMachine
        var TaskStateMachine = new StateMachine();

        // Create Normal StateMachine
        // This control events on normal status.
        var NormalState = TaskStateMachine.create({
            elem: $taskList.find('div.task-contents')
        });

        // Create Editing StateMachine
        // This control events on editing tasks.
        var EditState = TaskStateMachine.create({
            elem: $taskList.find('input[type=text]')
        });


        // register events on NormalState
        NormalState.on('click', function(e) {
            var $this = $(this);
            $this.find('a').hide();
            $this.find('input[type=text]').val($this.text()).show().focus();
            TaskStateMachine.switchTo(EditState);
        });


        // register events on EditState
        EditState.on('switchToNormal', function(e, $this) {
            $this.hide();
            $this.prev('a').show();
            TaskStateMachine.switchTo(NormalState);
        });
        EditState.on('blur', function(e) {
            EditState.fire('switchToNormal', [$(this)]);
        });

        EditState.on('keypress', function(e) {
            var $this = $(this);
            if ($this.is(':focus') && e.which === 13) { // focus text field and press the enter key
                EditState.fire('switchToNormal', [$this]);
            }
        });

        // Default status -> NormalState
        TaskStateMachine.switchTo(NormalState);
    };

    $(function() {

        // Get user's task list
        var taskAjax = $.getJSON('/api/task/' + userId + '/', function(data) {
            Task.populate(data.body);
        });



        $.when(taskAjax).done(function() {
            // render task list
            Task.render();

            // after drawed, create states
            createStates();
        });
    });
})(this.jQuery, this);

