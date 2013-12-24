var map = require('../');
var test = require('tape');

test('numbers -> letters', function (t) {
    t.plan(2);
    var a = map([97,98,99], function (c) {
        return String.fromCharCode(c);
    });
    t.equal(a.join(''), 'abc');
    
    var b = map(cripple([97,98,99]), function (c) {
        return String.fromCharCode(c);
    });
    t.equal(b.join(''), 'abc');
});

test('elements and indexes', function (t) {
    t.plan(8);
    var x = { q: 5 }, y = 3, z = null;
    
    t.deepEqual(
        map([x,y,z], function (c, i) { return i }),
        [ 0, 1, 2 ],
        'index check'
    );
    t.deepEqual(
        map([x,y,z], function (c, i) { return i }),
        [ 0, 1, 2 ],
        'crippled index check'
    );
    
    var xs0 = [ x, y, z ];
    map(xs0, function (c, i, xs) {
        t.strictEqual(xs, xs0, 'argument[2]');
    });
    var xs1 = [ x, y, z ];
    map(xs1, function (c, i, xs) {
        t.strictEqual(xs, xs1, 'crippled argument[2]');
    });
});

test('map ignores holes', function (t) {
    map(new Array(5), function (x) {
        t.fail('stepped into a hole');
    });
    map(cripple(new Array(5)), function (x) {
        t.fail('stepped into a hole');
    });
    t.end();
});

function cripple (xs) {
    xs.map = undefined;
    return xs;
}
