(function($) {

    module('Model');

    test('create Model', function() {
        var User = Model.create(['name', 'email', 'password', 'male']);
        var Animal = Model.create(['name', 'roar', 'male']);

        ok(User !== Animal);
        equal(User.attributes, ['id', 'name', 'email', 'password', 'male']);
        equal(Animal.attributes, ['id', 'name', 'roar', 'male']);
    });
}) (jQuery);
