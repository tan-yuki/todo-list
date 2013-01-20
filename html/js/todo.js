(function($, __global__) {

    // Auth

    // Login
    var authData = $.cookie('TODO.a');
    if (! authData) {
        $('#login-form').modal();
    }



    // Additional initialization code such as adding Event Listeners goes here
    var data = {
        tasks: [
            {
                id: "1",
                title: "買い物",
                checked: false
            },
            {
                id: "2",
                title: "宿題",
                checked: true
            },
            {
                id: "3",
                title: "お掃除",
                checked: false
            }
        ]
    };

    $("#task-tmpl").tmpl(data).appendTo("#todo-inner");

})(jQuery, window);

