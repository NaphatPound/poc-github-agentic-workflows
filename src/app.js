// ============================================================
// POC - Mock Website with Intentional Bugs
// ============================================================

// === Feature 1: Calculator ===

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // BUG-01: No division by zero check (should handle b === 0)
    return a / b;
}

function calculate() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);
    var operator = document.getElementById('operator').value;
    var result;

    switch (operator) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            result = divide(num1, num2);
            break;
        default:
            result = 'Invalid operator';
    }

    document.getElementById('calc-result').textContent = 'Result: ' + result;
}

// === Feature 2: Todo List ===

var todos = [];

function addTodo() {
    var input = document.getElementById('todo-input');
    var text = input.value;

    // BUG-04: No validation for empty input (should check if text is empty/whitespace)
    todos.push({ text: text, completed: false });
    input.value = '';
    renderTodos();
}

function deleteTodo(index) {
    // BUG-03: Off-by-one error - deletes wrong item (should be: todos.splice(index, 1))
    todos.splice(index + 1, 1);
    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function renderTodos() {
    var list = document.getElementById('todo-list');
    list.innerHTML = '';

    todos.forEach(function (todo, index) {
        var li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }

        li.innerHTML =
            '<span>' + todo.text + '</span>' +
            '<div>' +
            '<button class="btn-complete" onclick="toggleComplete(' + index + ')">' +
            (todo.completed ? 'Undo' : 'Done') +
            '</button>' +
            '<button class="btn-delete" onclick="deleteTodo(' + index + ')">Delete</button>' +
            '</div>';

        list.appendChild(li);
    });
}

// === Feature 3: User Profile Card ===

function formatEmail(user, domain) {
    // BUG-05: Missing @ symbol (should be: return user + '@' + domain)
    return user + domain;
}

function loadProfile() {
    var name = 'John Doe';
    var email = formatEmail('john.doe', 'example.com');

    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-email').textContent = email;
}

function editProfile() {
    var name = prompt('Enter new name:', document.getElementById('profile-name').textContent);
    if (name) {
        document.getElementById('profile-name').textContent = name;
    }

    var user = prompt('Enter email username:', 'john.doe');
    var domain = prompt('Enter email domain:', 'example.com');
    if (user && domain) {
        document.getElementById('profile-email').textContent = formatEmail(user, domain);
    }
}

// Initialize on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        loadProfile();
    });
}

// Export for testing (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        addTodo: addTodo,
        deleteTodo: deleteTodo,
        toggleComplete: toggleComplete,
        formatEmail: formatEmail,
        todos: todos
    };
}
