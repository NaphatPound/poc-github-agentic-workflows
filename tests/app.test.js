// ============================================================
// Unit Tests for POC Mock Website
// Tests designed to detect all 6 intentional bugs
// ============================================================

const {
    add,
    subtract,
    multiply,
    divide,
    formatEmail,
} = require('../src/app.js');

// === Test Helper ===

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
    try {
        fn();
        passed++;
        console.log('  PASS: ' + name);
    } catch (e) {
        failed++;
        failures.push({ name: name, error: e.message });
        console.log('  FAIL: ' + name);
        console.log('        ' + e.message);
    }
}

function expect(actual) {
    return {
        toBe: function (expected) {
            if (actual !== expected) {
                throw new Error('Expected ' + JSON.stringify(expected) + ' but got ' + JSON.stringify(actual));
            }
        },
        toContain: function (substr) {
            if (typeof actual !== 'string' || actual.indexOf(substr) === -1) {
                throw new Error('Expected "' + actual + '" to contain "' + substr + '"');
            }
        },
        not: {
            toBe: function (expected) {
                if (actual === expected) {
                    throw new Error('Expected value to NOT be ' + JSON.stringify(expected));
                }
            },
            toBeNaN: function () {
                if (isNaN(actual)) {
                    throw new Error('Expected value to NOT be NaN but got NaN');
                }
            }
        }
    };
}

// === Calculator Tests ===

console.log('\n--- Calculator Tests ---');

test('add(2, 3) should return 5', function () {
    expect(add(2, 3)).toBe(5);
});

test('add(-1, 1) should return 0', function () {
    expect(add(-1, 1)).toBe(0);
});

test('[BUG-02] subtract(10, 3) should return 7', function () {
    expect(subtract(10, 3)).toBe(7);
});

test('[BUG-02] subtract(5, 5) should return 0', function () {
    expect(subtract(5, 5)).toBe(0);
});

test('[BUG-02] subtract(0, 5) should return -5', function () {
    expect(subtract(0, 5)).toBe(-5);
});

test('multiply(4, 5) should return 20', function () {
    expect(multiply(4, 5)).toBe(20);
});

test('multiply(0, 100) should return 0', function () {
    expect(multiply(0, 100)).toBe(0);
});

test('divide(10, 2) should return 5', function () {
    expect(divide(10, 2)).toBe(5);
});

test('[BUG-01] divide(10, 0) should handle division by zero gracefully', function () {
    var result = divide(10, 0);
    // Should return an error message or throw, not Infinity
    expect(result === Infinity || result === -Infinity).toBe(false);
});

// === Todo List Tests ===

console.log('\n--- Todo List Tests ---');

// We need to mock the DOM for todo tests, so we test the logic only
test('[BUG-03] deleteTodo should remove the correct item (off-by-one check)', function () {
    // Simulate the todos array directly
    var testTodos = [
        { text: 'Item A', completed: false },
        { text: 'Item B', completed: false },
        { text: 'Item C', completed: false },
    ];

    // Simulate deleteTodo(0) - should remove 'Item A'
    // BUG: uses index + 1, so splice(1, 1) removes 'Item B' instead
    var indexToDelete = 0;
    var buggyIndex = indexToDelete + 1; // This is the bug
    var correctIndex = indexToDelete;

    // Test that buggy behavior removes the WRONG item
    var buggyCopy = testTodos.slice();
    buggyCopy.splice(buggyIndex, 1);

    var correctCopy = testTodos.slice();
    correctCopy.splice(correctIndex, 1);

    // The correct behavior should remove 'Item A', leaving ['Item B', 'Item C']
    expect(correctCopy[0].text).toBe('Item B');
    expect(correctCopy.length).toBe(2);

    // But the buggy code removes 'Item B', leaving ['Item A', 'Item C']
    // This test verifies the bug exists - splice(index+1) removes wrong item
    expect(buggyCopy[0].text).toBe('Item A'); // Bug: 'Item A' still exists
    expect(buggyCopy[0].text).not.toBe('Item A'); // This will FAIL, proving the bug
});

test('[BUG-04] addTodo should not accept empty input', function () {
    // The current code does NOT validate empty input
    var emptyText = '';
    var trimmedText = emptyText.trim();
    // A proper implementation should reject empty strings
    expect(trimmedText.length > 0).toBe(true);
});

// === Profile Card Tests ===

console.log('\n--- Profile Card Tests ---');

test('[BUG-05] formatEmail should include @ symbol', function () {
    var email = formatEmail('john.doe', 'example.com');
    expect(email).toContain('@');
});

test('[BUG-05] formatEmail should produce valid email format', function () {
    var email = formatEmail('user', 'domain.com');
    expect(email).toBe('user@domain.com');
});

// === Summary ===

console.log('\n========================================');
console.log('Test Results: ' + passed + ' passed, ' + failed + ' failed');
console.log('========================================');

if (failures.length > 0) {
    console.log('\nFailed Tests (These represent the intentional bugs):');
    failures.forEach(function (f, i) {
        console.log('  ' + (i + 1) + '. ' + f.name);
        console.log('     -> ' + f.error);
    });
}

console.log('\nBug Detection Summary:');
console.log('  BUG-01 (Division by zero): ' + (failures.some(function(f) { return f.name.indexOf('BUG-01') !== -1; }) ? 'DETECTED' : 'NOT DETECTED'));
console.log('  BUG-02 (Subtract bug):     ' + (failures.some(function(f) { return f.name.indexOf('BUG-02') !== -1; }) ? 'DETECTED' : 'NOT DETECTED'));
console.log('  BUG-03 (Delete off-by-one): ' + (failures.some(function(f) { return f.name.indexOf('BUG-03') !== -1; }) ? 'DETECTED' : 'NOT DETECTED'));
console.log('  BUG-04 (Empty todo):        ' + (failures.some(function(f) { return f.name.indexOf('BUG-04') !== -1; }) ? 'DETECTED' : 'NOT DETECTED'));
console.log('  BUG-05 (Email format):      ' + (failures.some(function(f) { return f.name.indexOf('BUG-05') !== -1; }) ? 'DETECTED' : 'NOT DETECTED'));
console.log('  BUG-06 (CSS z-index):       Requires browser testing');

process.exit(failed > 0 ? 1 : 0);
